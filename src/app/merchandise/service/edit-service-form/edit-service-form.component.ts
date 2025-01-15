import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { UpdateRequest } from '../model/update-request';
import { ServiceService } from '../service.service';
import { CreateMerchandisePhotoDTO, PhotoToAdd } from '../../merchandise/model/merchandise-photos-request-dto';
import { MapComponent } from "../../../shared/map/map.component";
import { AddressDTO } from '../../../infrastructure/auth/model/register-dtos/address.dto';
import { CommonModule } from '@angular/common';
import { EventTypeService } from '../../../event-type/event-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../../../shared/photos/photo.service';
import { JwtService } from '../../../infrastructure/auth/jwt.service';
import { CreateEventTypeResponseDTO } from '../../../event-type/create-event-type-form/dtos/create-event-type-response.dto';
import { tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-service-form',
  standalone: true,
  imports: [DropdownModule, FormsModule, MultiSelectModule, RadioButtonModule, ButtonModule, 
            ReactiveFormsModule, CheckboxModule, MapComponent, CommonModule],
  templateUrl: './edit-service-form.component.html',
  styleUrl: './edit-service-form.component.scss',
  providers: [MessageService]
})
export class EditServiceFormComponent implements OnInit {
  selectedEventTypes: any[] = [];
  allEventTypes: CreateEventTypeResponseDTO[] = [];
  photosToShow: string[] = [];
  photosToAdd: PhotoToAdd[] = [];
  loadingPhotos: { id: string; loading: boolean }[] = [];
  fbl: FormBuilder = new FormBuilder();
  serviceId!: number;

  editServiceForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    specificity: new FormControl('', [Validators.required]),
    price: new FormControl<number|null|undefined>(null, [Validators.required, Validators.min(0)]),
    discount: new FormControl<number|null|undefined>(null, [Validators.required, Validators.min(0), Validators.max(100)]),
    city: new FormControl<string|null|undefined>(null, [Validators.required]),
    street: new FormControl<string|null|undefined>(null, [Validators.required]),
    houseNumber: new FormControl<string|null|undefined>(null, [Validators.required]),
    longitude: new FormControl<number|null|undefined>(null, [Validators.required]),
    latitude: new FormControl<number|null|undefined>(null, [Validators.required]),
    eventTypesIds: new FormControl([], [Validators.required]),
    minDuration: new FormControl<number|null|undefined>(null, [Validators.required, Validators.min(0)]),
    maxDuration: new FormControl<number|null|undefined>(null, [Validators.required, Validators.min(0)]),
    reservationDeadline: new FormControl<number|null|undefined>(null, [Validators.required, Validators.min(0)]),
    cancellationDeadline: new FormControl<number|null|undefined>(null, [Validators.required, Validators.min(0)]),
    automaticReservation: new FormControl<boolean>(false, [Validators.required]),
    photos: this.fbl.array([]),
    visible: new FormControl(false, [Validators.required]),
    available: new FormControl(false, [Validators.required])
  });
  constructor(private serviceService: ServiceService, private eventTypeService: EventTypeService, 
              private route: ActivatedRoute, private router: Router, private photoService: PhotoService,
              private jwtService: JwtService, private messageService: MessageService) { }
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.serviceId = id ? Number(id) : -1;
    this.eventTypeService.getAllActiveWp().subscribe({
      next: (response) => {
        this.allEventTypes = response;
      }
    });

    this.serviceService.getServiceById(this.serviceId).subscribe({
      next: (response) => {
        this.editServiceForm.patchValue({
          title: response.title,
          description: response.description,
          specificity: response.specificity,
          price: response.price,
          discount: response.discount,
          city: response.address.city,
          street: response.address.street,
          houseNumber: response.address.number,
          longitude: response.address.longitude,
          latitude: response.address.latitude,
          minDuration: response.minDuration,
          maxDuration: response.maxDuration,
          reservationDeadline: response.reservationDeadline,
          cancellationDeadline: response.cancellationDeadline,
          automaticReservation: response.automaticReservation,
          visible: response.visible,
          available: response.available
        });

        this.selectedEventTypes = response.eventTypes.map(x => x.id);

        const photosArray = this.editServiceForm.get('photos') as FormArray;
        if(response.merchandisePhotos != null && response.merchandisePhotos != undefined) {
          response.merchandisePhotos.forEach(photo => {
            photosArray.push(this.fbl.group({ photo: new FormControl(photo.photo) }));
  
            this.photosToAdd.push({
              id: photo.id,
              photo: photo.photo
            });
          });
  
          this.updatePhotosToShow();
        }
      }
    });
  }

  onAddressSelected(address: AddressDTO) {
    this.editServiceForm.patchValue({
      city: address.city,
      street: address.street,
      houseNumber: address.number,
      longitude: address.longitude,
      latitude: address.latitude
    });
  }

  uploadFile($event: any): void {
    const files = $event.target.files as File[];
    if (files && files.length > 0) {
      const file = files[0];
      const photosArray = this.editServiceForm.get('photos') as FormArray;
  
      // Generate a temporary ID for the loading state
      const tempId = `${file.name}-${Date.now()}`;
      this.loadingPhotos.push({ id: tempId, loading: true });
  
      // Add a placeholder while the photo uploads
      photosArray.push(this.fbl.group({
          photo: new FormControl(tempId) // Use tempId as a placeholder
      }));
      this.updatePhotosToShow();
  
      this.photoService.uploadMerchandisePhoto(file).pipe(
        tap(response => {
        // Replace the placeholder ID with the real photo URL
          const photoIndex = this.photosToAdd.findIndex(x => x.photo === tempId);
          if (photoIndex !== -1) {
            this.photosToAdd[photoIndex] = {
              id: response,
              photo: file.name
            };
          } else {
            this.photosToAdd.push({
              id: response,
              photo: file.name
            });
          }
          // Mark the photo as not loading
          this.loadingPhotos = this.loadingPhotos.filter(x => x.id !== tempId);
  
          // Update the form array
          const photosArray = this.editServiceForm.get('photos') as FormArray;
          const photoControlIndex = photosArray.value.findIndex(
            (photo: { photo: string }) => photo.photo === tempId
          );
          if (photoControlIndex !== -1) {
          photosArray.at(photoControlIndex).patchValue({ photo: file.name });
          }
          this.updatePhotosToShow();
        })
      ).subscribe({
        error: () => {
        // Remove the placeholder if the upload fails
          this.loadingPhotos = this.loadingPhotos.filter(x => x.id !== tempId);
          photosArray.removeAt(photosArray.length - 1); // Remove the last added placeholder
          this.updatePhotosToShow();
        }
      });
    }
  }

  getPhotoUrl(photo: string): string{
    return this.photoService.getPhotoUrl(photo);
  }

  addPhoto(photoName: string): void {
    const photosArray = this.editServiceForm.get('photos') as FormArray;
    photosArray.push(this.fbl.group({
      photo: new FormControl(photoName)
    }));
    this.updatePhotosToShow();
  }

  updatePhotosToShow(): void {
    const photosArray = this.editServiceForm.get('photos') as FormArray;
    this.photosToShow = photosArray.value.map((photo: { photo: string }) => {
        const isLoading = this.loadingPhotos.some(x => x.id === photo.photo);
        return isLoading ? 'loading-indicator.png' : this.getPhotoUrl(photo.photo)
    });
  }

  removePhoto(index: number): void {
    const photosArray = this.editServiceForm.get('photos') as FormArray;

    // Get the photo name from the form array
    const photoUrl = photosArray.at(index).value.photo;
    const photoName = photoUrl.split('/').pop() // extract just the filename without the extension

    // Find the ID of the photo
    const photoId = this.photosToAdd.find(photo => {
      const storedPhotoName = photo.photo.split('/').pop()
      return storedPhotoName === photoName;
    })?.id;

    if (photoId) {
      this.photoService.deleteMercPhoto(photoId, this.serviceId, true).pipe(
        tap(response => {
          // Success handling here
        })
      ).subscribe();

      // Remove the corresponding photo from photosToAdd
      const photoIndex = this.photosToAdd.findIndex(photo => {
        const storedPhotoName = photo.photo.split('/').pop()
        return storedPhotoName === photoName;
      });
      if (photoIndex !== -1) {
        this.photosToAdd.splice(photoIndex, 1);
      }
      // Remove the photo from the FormArray
      photosArray.removeAt(index);

      // Update the list of photos to show
      this.updatePhotosToShow();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Missing photo',
        detail: 'Photo not found'
      });
    }
  }

  getPhotos(): CreateMerchandisePhotoDTO[] {
    const photosArray = this.editServiceForm.get('photos') as FormArray;
    return photosArray.value as CreateMerchandisePhotoDTO[];
  }

  isFormValid() {
    if(this.editServiceForm.value.minDuration == null || this.editServiceForm.value.maxDuration == null) {
      return false;
    }
    if(this.editServiceForm.value.minDuration > this.editServiceForm.value.maxDuration) {
      this.messageService.add({ severity: 'error', summary: 'Fail', detail: "Minimum Duration cannot be greater than Maximum!" });
      return false;
    }
    if(this.editServiceForm.value.reservationDeadline == null || this.editServiceForm.value.cancellationDeadline == null) {
      return false;
    }
    if(this.editServiceForm.value.cancellationDeadline > this.editServiceForm.value.reservationDeadline) {
      this.messageService.add({ severity: 'error', summary: 'Fail', detail: "Cancellation Deadline cannot be greater than Reservation Deadline!" });
      return false;
    }
    return true;
  }

  onSubmit() {
    if(this.isFormValid()) {
      const updatedService: UpdateRequest = {
        title: this.editServiceForm.controls.title.value,
        description: this.editServiceForm.controls.description.value,
        specificity: this.editServiceForm.controls.specificity.value,
        price: this.editServiceForm.controls.price.value,
        discount: this.editServiceForm.controls.discount.value,
        eventTypesIds: this.selectedEventTypes,
        minDuration: this.editServiceForm.controls.minDuration.value,
        maxDuration: this.editServiceForm.controls.maxDuration.value,
        reservationDeadline: this.editServiceForm.controls.reservationDeadline.value,
        cancellationDeadline: this.editServiceForm.controls.cancellationDeadline.value,
        automaticReservation: this.editServiceForm.controls.automaticReservation.value,
        visible: this.editServiceForm.controls.visible.value,
        available: this.editServiceForm.controls.available.value,
        photos: this.photosToAdd.map(x => x.id),
        address: {
          city: this.editServiceForm.controls.city.value,
          street: this.editServiceForm.controls.street.value,
          number: this.editServiceForm.controls.houseNumber.value,
          longitude: this.editServiceForm.controls.longitude.value,
          latitude: this.editServiceForm.controls.latitude.value,
        },
        serviceProviderId: this.jwtService.getIdFromToken()
      }
  
      this.serviceService.update(this.serviceId, updatedService).subscribe({
        next: (response) => {
          this.router.navigate(['home/my_services']);
        },
        error: (error) => {
          if (error.error && error.error.message) {
            this.messageService.add({
              severity: 'error',
              summary: 'Updating Service Error',
              detail: error.error.message
            });
          } else if (error.message) {
            this.messageService.add({
              severity: 'error',
              summary: 'Updating Service Error',
              detail: error.message
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update service. Please try again.'
            });
          }
        }
      });
    }
  }
}
