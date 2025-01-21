import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton'; 
import { CreateCategoryDto } from '../../category/model/category.dto';
import { CategoryDto } from '../../category/model/category.dto';

import { CreateEventTypeResponseDTO } from '../../../event-type/create-event-type-form/dtos/create-event-type-response.dto';
import { EventTypeService } from '../../../event-type/event-type.service';
import { CategoryService } from '../../category/category.service';
import { ProductService } from '../product.service';
import { response } from 'express';
import { tap } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { AddCategoryComponent } from '../../category/add-category/add-category.component';
import { CreateProductRequestDTO } from './dto/create-product.dto';
import { JwtService } from '../../../infrastructure/auth/jwt.service';
import { RecommendCategoryComponent } from '../../category/recommend-category/recommend-category.component';
import { CreateMerchandisePhotoDTO } from '../../merchandise/model/merchandise-photos-request-dto';
import { PhotoToAdd } from '../../merchandise/model/merchandise-photos-request-dto';
import { CommonModule } from '@angular/common';
import { PhotoService } from '../../../shared/photos/photo.service';
import { MapComponent } from '../../../shared/map/map.component';
import { AddressDTO } from '../../../infrastructure/auth/model/register-dtos/address.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    MultiSelectModule,
    RadioButtonModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
    DialogModule,
    RecommendCategoryComponent,
    MapComponent
  ],
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})

export class CreateProductComponent {
  categories: CategoryDto[] = [];
  eventTypes: CreateEventTypeResponseDTO[] = [];
  selectedCategory: any = null;
  selectedEventTypes: any[] = [];
  displayAddCategoryForm: boolean = false;
  photosToShow: string[] = [];

  photosToAdd: PhotoToAdd[] = [];

  fbl: FormBuilder = new FormBuilder();

  addProductForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    specificity: new FormControl('', [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    discount: new FormControl(null, [Validators.min(0), Validators.max(100)]),
    category: new FormControl(null, [Validators.required]),
    city: new FormControl<string|null|undefined>(null, [Validators.required]),
    street: new FormControl<string|null|undefined>(null, [Validators.required]),
    number: new FormControl<string|null|undefined>(null, [Validators.required]),
    latitude:new FormControl<number|null|undefined>(null, [Validators.required]),
    longitude:new FormControl<number|null|undefined>(null, [Validators.required]),
    eventTypes: new FormControl([]),
    minDuration: new FormControl(null, [Validators.required, Validators.min(0)]),
    maxDuration: new FormControl(null, [Validators.required, Validators.min(0)]),
    reservationDeadline: new FormControl(null, [Validators.required, Validators.min(0)]),
    cancellationDeadline: new FormControl(null, [Validators.required, Validators.min(0)]),
    automaticReservation: new FormControl(false),
    merchandisePhotos: this.fbl.array([])
  });

  constructor(private eventTypeService: EventTypeService, private categoryService: CategoryService, private productService: ProductService, private jwtService: JwtService,
    private photoService: PhotoService, private router: Router
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this.categoryService.getAllApproved().pipe(tap(response => {
      this.categories = response;
    })).subscribe();
    this.eventTypeService.getAllActiveWp().pipe(tap(response => {
      this.eventTypes = response;
    })).subscribe();
  }

  uploadFile($event: any): void {
    const files = $event.target.files as File[];
    if (files && files.length > 0) {
        const file = files[0];
        const photosArray = this.addProductForm.get('merchandisePhotos') as FormArray;

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
                const photosArray = this.addProductForm.get('merchandisePhotos') as FormArray;
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

  onAddressSelected(address: AddressDTO) {
    this.addProductForm.patchValue({
      city: address.city,
      street: address.street,
      number: address.number,
      latitude:address.latitude,
      longitude:address.longitude
    });
  }

  getPhotoUrl(photo: string): string {
    return this.photoService.getPhotoUrl(photo);
  }

  addPhoto(photoName: string): void {
    const photosArray = this.addProductForm.get('merchandisePhotos') as FormArray;
    photosArray.push(this.fbl.group({
      photo: new FormControl(photoName)
    }));
    this.updatePhotosToShow();
  }
  loadingPhotos: { id: string; loading: boolean }[] = [];

  updatePhotosToShow(): void {
    const photosArray = this.addProductForm.get('merchandisePhotos') as FormArray;
    this.photosToShow = photosArray.value.map((photo: { photo: string }) => {
        const isLoading = this.loadingPhotos.some(x => x.id === photo.photo);
        return isLoading ? 'loading-indicator.png' : this.getPhotoUrl(photo.photo);
    });
}

  removePhoto(index: number): void {
    const photosArray = this.addProductForm.get('merchandisePhotos') as FormArray;

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


  getPhotos(): CreateMerchandisePhotoDTO[] {
    const photosArray = this.addProductForm.get('merchandisePhotos') as FormArray;
    return photosArray.value as CreateMerchandisePhotoDTO[];
  }

  createProduct(): void {
    const dto: CreateProductRequestDTO = {
      title: this.addProductForm.controls.title.value,
      description: this.addProductForm.controls.description.value,
      specificity: this.addProductForm.controls.specificity.value,
      price: this.addProductForm.controls.price.value,
      discount: this.addProductForm.controls.discount.value,
      address: {
        city: this.addProductForm.controls.city.value,
        street: this.addProductForm.controls.street.value,
        number: this.addProductForm.controls.number.value,
        latitude: this.addProductForm.controls.latitude.value,
        longitude: this.addProductForm.controls.longitude.value
      },
      visible: true,
      available: true,
      minDuration: this.addProductForm.controls.minDuration.value,
      maxDuration: this.addProductForm.controls.maxDuration.value,
      reservationDeadline: this.addProductForm.controls.reservationDeadline.value,
      cancellationDeadline: this.addProductForm.controls.cancellationDeadline.value,
      automaticReservation: this.addProductForm.controls.automaticReservation.value,
      serviceProviderId: this.jwtService.getIdFromToken(),
      merchandisePhotos: this.photosToAdd.map(x => x.id),
      eventTypesIds: this.selectedEventTypes,
      categoryId: this.selectedCategory,
    };
    this.productService.create(dto).pipe(
      tap(response => {
        this.router.navigate(['home/my_products'])
      })
    ).subscribe();
  }

  showAddCategoryForm() {
    this.displayAddCategoryForm = true;
  }

  createCategory(categoryCreated: CategoryDto|null) {
    if (categoryCreated != null) {
      this.selectedCategory = categoryCreated;
      this.categories.push(categoryCreated);
    } else {
      console.log("fail");
    }
    this.displayAddCategoryForm = false;
  }
}
