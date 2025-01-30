import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateRequest } from '../model/create-request';
import { ServiceService } from '../service.service';
import { EventType } from '../../../event-type/event-type';
import { CreateMerchandisePhotoDTO, PhotoToAdd } from '../../merchandise/model/merchandise-photos-request-dto';
import { CategoryService } from '../../category/category.service';
import { CategoryDto } from '../../category/model/category.dto';
import { PhotoService } from '../../../shared/photos/photo.service';
import { tap } from 'rxjs';
import { EventTypeService } from '../../../event-type/event-type.service';
import { MapComponent } from '../../../shared/map/map.component';
import { AddressDTO } from '../../../infrastructure/auth/model/register-dtos/address.dto';
import { Router } from '@angular/router';
import { JwtService } from '../../../infrastructure/auth/jwt.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { RecommendCategoryComponent } from "../../category/recommend-category/recommend-category.component";

@Component({
  selector: 'app-add-service-form',
  standalone: true,
  imports: [DropdownModule, FormsModule, MultiSelectModule, RadioButtonModule, ButtonModule,
    ReactiveFormsModule, MapComponent, CommonModule, ToastModule, DialogModule, RecommendCategoryComponent],
  templateUrl: './add-service-form.component.html',
  styleUrl: './add-service-form.component.scss',
  providers: [MessageService]
})
export class AddServiceFormComponent implements OnInit {
  allCategories: CategoryDto[] = [];
  displayAddCategoryForm = false;
  allEventTypes: EventType[] = [];
  loadingPhotos: { id: string; loading: boolean }[] = [];
  photosToShow: string[] = [];
  photosToAdd: PhotoToAdd[] = [];
  fbl: FormBuilder = new FormBuilder();

  addServiceForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      specificity: new FormControl('', [Validators.required]),
      city: new FormControl<string|null|undefined>(null, [Validators.required]),
      street: new FormControl<string|null|undefined>(null, [Validators.required]),
      number: new FormControl<string|null|undefined>(null, [Validators.required]),
      longitude: new FormControl<number|null|undefined>(null, [Validators.required]),
      latitude: new FormControl<number|null|undefined>(null, [Validators.required]),
      price: new FormControl<number|null|undefined>(null, [Validators.required, Validators.min(0)]),
      discount: new FormControl<number|null|undefined>(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      categoryId: new FormControl(-1, [Validators.required]),
      eventTypesIds: new FormControl<number[]|null|undefined>([], [Validators.required]),
      minDuration: new FormControl<number|null|undefined>(null, [Validators.required, Validators.min(0)]),
      maxDuration: new FormControl<number|null|undefined>(null, [Validators.min(0)]),
      reservationDeadline: new FormControl<number|null|undefined>(null, [Validators.required, Validators.min(0)]),
      cancellationDeadline: new FormControl<number|null|undefined>(null, [Validators.required, Validators.min(0)]),
      automaticReservation: new FormControl<boolean|null|undefined>(null, [Validators.required]),
      merchandisePhotos: this.fbl.array([])
  });

  constructor(private fb: FormBuilder,
              private serviceService: ServiceService,
              private categoryService: CategoryService,
              private photoService: PhotoService,
              private eventTypeService: EventTypeService,
              private router: Router,
              private jwtService: JwtService,
              private messageService: MessageService) {}

  ngOnInit(): void {
    this.categoryService.getAllApproved().pipe(tap(response => {
      this.allCategories = response;
      const newCategory: CategoryDto = {
        id: -1,
        title: 'other',
        description: '',
        pending: false
      }
      this.allCategories.push(newCategory);
    })).subscribe();
    this.eventTypeService.getAllActiveWp().pipe(tap(response => {
      this.allEventTypes = response;
    })).subscribe();
  }

  onCategoryChange(event: any) {
    const selectedCategoryId = event.value?.id;
    this.addServiceForm.patchValue({categoryId: selectedCategoryId});
    if(selectedCategoryId == -1) {
      this.displayAddCategoryForm = true;
    }
  }

  createCategory(categoryCreated: CategoryDto|null) {
    if (categoryCreated != null) {
      this.addServiceForm.patchValue({categoryId: categoryCreated.id});
      this.allCategories.push(categoryCreated);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Creating Service Error',
        detail: 'Failed to create category!'
      });
    }
    this.displayAddCategoryForm = false;
  }

  onEventTypesChange(event: any) {
    const selectedIds = event.value.map((item: EventType) => item.id);
    this.addServiceForm.patchValue({ eventTypesIds: selectedIds});
  }

  addPhoto(photoName: string): void {
    const photosArray = this.addServiceForm.get('merchandisePhotos') as FormArray;
    photosArray.push(this.fbl.group({
      photo: new FormControl(photoName)
    }));
    this.updatePhotosToShow();
  }

  updatePhotosToShow(): void {
    const photosArray = this.addServiceForm.get('merchandisePhotos') as FormArray;
    this.photosToShow = photosArray.value.map((photo: { photo: string }) => {
        const isLoading = this.loadingPhotos.some(x => x.id === photo.photo);
        return isLoading ? 'loading-indicator.png' : this.getPhotoUrl(photo.photo);
    });
  }

  getPhotoUrl(photo: string): string {
    return this.photoService.getPhotoUrl(photo);
  }

  getPhotos(): CreateMerchandisePhotoDTO[] {
    const photosArray = this.addServiceForm.get('merchandisePhotos') as FormArray;
    return photosArray.value as CreateMerchandisePhotoDTO[];
  }

  removePhoto(index: number): void {
    const photosArray = this.addServiceForm.get('merchandisePhotos') as FormArray;

    // Get the photo name from the form array
    const photoName = photosArray.at(index).value.photo;

    this.photoService.deleteMercPhoto(this.photosToAdd.find(photo => photo.photo === photoName)?.id, -1, false).pipe(
      tap(response => {

      })
    ).subscribe();

    // Remove the corresponding photo from photosToAdd by matching the photo name
    const photoIndex = this.photosToAdd.findIndex(photo => photo.photo === photoName);
    if (photoIndex !== -1) {
      this.photosToAdd.splice(photoIndex, 1);
    }


    // Remove the photo from the FormArray
    photosArray.removeAt(photoIndex);

    // Update the list of photos to show
    this.updatePhotosToShow();
  }

  uploadFile($event: any): void {
    const files = $event.target.files as File[];
    if (files && files.length > 0) {
      const file = files[0];
      const photosArray = this.addServiceForm.get('merchandisePhotos') as FormArray;
  
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
          const photosArray = this.addServiceForm.get('merchandisePhotos') as FormArray;
          const photoControlIndex = photosArray.value.findIndex((photo: { photo: string }) => photo.photo === tempId);
          if (photoControlIndex !== -1) {
            photosArray.at(photoControlIndex).patchValue({ photo: file.name });
          }
  
          this.updatePhotosToShow();
        }
      ))
      .subscribe({
          error: () => {
            // Remove the placeholder if the upload fails
            this.loadingPhotos = this.loadingPhotos.filter(x => x.id !== tempId);
            photosArray.removeAt(photosArray.length - 1); // Remove the last added placeholder
            this.updatePhotosToShow();
          }
      });
    } 
  }

  onAddressSelected(address: AddressDTO) {
    this.addServiceForm.patchValue({
      city: address.city,
      street: address.street,
      number: address.number,
      latitude: address.latitude,
      longitude: address.longitude
    });
  }

  isFormValid() {
    if(this.addServiceForm.value.categoryId == -1) {
      this.messageService.add({ severity: 'error', summary: 'Fail', detail: "Category not selected!" });
      return false;
    }
    if(this.addServiceForm.value.minDuration == null) {
      return false;
    }
    if(this.addServiceForm.value.maxDuration !== undefined && this.addServiceForm.value.maxDuration !== null) {
      if(this.addServiceForm.value.minDuration > this.addServiceForm.value.maxDuration) {
        this.messageService.add({ severity: 'error', summary: 'Fail', detail: "Minimum Duration cannot be greater than Maximum!" });
        return false;
      }
    }
    if(this.addServiceForm.value.reservationDeadline == null || this.addServiceForm.value.cancellationDeadline == null) {
      return false;
    }
    if(this.addServiceForm.value.cancellationDeadline > this.addServiceForm.value.reservationDeadline) {
      this.messageService.add({ severity: 'error', summary: 'Fail', detail: "Cancellation Deadline cannot be greater than Reservation Deadline!" });
      return false;
    }
    return true;
  }

  submit() {
    if(this.isFormValid()) {
      const newService: CreateRequest = {
        title: this.addServiceForm.controls.title.value,
        description: this.addServiceForm.controls.description.value,
        specificity: this.addServiceForm.controls.specificity.value,
        price: this.addServiceForm.controls.price.value,
        discount: this.addServiceForm.controls.discount.value,
        categoryId: this.addServiceForm.controls.categoryId.value,
        eventTypesIds: this.addServiceForm.controls.eventTypesIds.value,
        minDuration: this.addServiceForm.controls.minDuration.value,
        maxDuration: this.addServiceForm.controls.maxDuration.value,
        reservationDeadline: this.addServiceForm.controls.reservationDeadline.value,
        cancellationDeadline: this.addServiceForm.controls.cancellationDeadline.value,
        automaticReservation: this.addServiceForm.controls.automaticReservation.value,
        merchandisePhotos: this.photosToAdd.map(x => x.id),
        address: {
          street: this.addServiceForm.controls.street.value,
          city: this.addServiceForm.controls.city.value,
          number: this.addServiceForm.controls.number.value,
          latitude: this.addServiceForm.controls.latitude.value,
          longitude: this.addServiceForm.controls.longitude.value
        },
        serviceProviderId: this.jwtService.getIdFromToken()
      };

      this.serviceService.create(newService).subscribe({
        next: (response) => {
          this.addServiceForm.reset();
          this.router.navigate(['home/my_services']);
        },
        error: (err) => {
          if (err.error && err.error.message) {
            this.messageService.add({
              severity: 'error',
              summary: 'Creating Service Error',
              detail: err.error.message
            });
          } else if (err.message) {
            this.messageService.add({
              severity: 'error',
              summary: 'Creating Service Error',
              detail: err.message
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to create service. Please try again.'
            });
          }
        }
      });
    }
      
  }
}
