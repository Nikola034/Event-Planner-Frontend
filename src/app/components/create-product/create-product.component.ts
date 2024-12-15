import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CategoryDto, CreateCategoryDto } from '../category/category.dto';
import { CreateEventTypeResponseDTO } from '../create-event-type-form/dtos/create-event-type-response.dto';
import { EventTypeService } from '../create-event-type-form/event-type.service';
import { CategoryService } from '../category/category.service';
import { ProductService } from '../product/product.service';
import { response } from 'express';
import { tap } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { AddCategoryComponent } from '../category/add-category/add-category.component';
import { CreateProductRequestDTO } from './dto/create-product.dto';
import { JwtService } from '../auth/jwt.service';
import { RecommendCategoryComponent } from '../category/recommend-category/recommend-category.component';
import { CreateMerchandisePhotoDTO } from '../merchandise/merchandise-photos-request-dto';

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
    DialogModule,
    RecommendCategoryComponent
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent {
  categories: CategoryDto[] = []
  eventTypes: CreateEventTypeResponseDTO[] = []
  displayAddCategoryForm: boolean = false;

  selectedCategory: any = null
  selectedEventTypes: any[] = []

  fbl: FormBuilder = new FormBuilder();

  addProductForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    specificity: new FormControl('', [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    discount: new FormControl(null, [Validators.min(0), Validators.max(100)]),
    category: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    street: new FormControl(null, [Validators.required]),
    number: new FormControl(null, [Validators.required]),
    eventTypes: new FormControl([]), 
    minDuration: new FormControl(null, [Validators.required, Validators.min(0)]),
    maxDuration: new FormControl(null, [Validators.required, Validators.min(0)]),
    duration: new FormControl(null), 
    reservationDeadline: new FormControl(null, [Validators.required, Validators.min(0)]),
    cancellationDeadline: new FormControl(null, [Validators.required, Validators.min(0)]),
    automaticReservation: new FormControl(false),
    merchandisePhotos: this.fbl.array([])
  });

  constructor(private eventTypeService: EventTypeService, private categoryService: CategoryService, private productService: ProductService, private jwtService: JwtService, private fb: FormBuilder){

  }

  ngOnInit(){
    this.loadData();
  }

  loadData(): void{
    this.categoryService.getAll().pipe(tap(response => {
      this.categories = response.categories
    })).subscribe()
    this.eventTypeService.getAllWp().pipe(tap(response => {
      this.eventTypes = response
    })).subscribe()
  }

  uploadFile($event: any): void {
    const files = $event.target.files as File[];
    if (files && files.length > 0) {
      Array.from(files).forEach((file: File) => {
        this.addPhoto(file.name); // Add photo to the FormArray
      });
    }
  }
  addPhoto(photoName: string): void {
    const photosArray = this.addProductForm.get('merchandisePhotos') as FormArray;
    photosArray.push(this.fb.group({
      photo: new FormControl(photoName)
    }));
  }
  getPhotos(): CreateMerchandisePhotoDTO[] {
    const photosArray = this.addProductForm.get('merchandisePhotos') as FormArray;
    return photosArray.value as CreateMerchandisePhotoDTO[];
  }
  createProduct(): void{
    console.log(this.selectedEventTypes)
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
        latitude: 0,
        longitude: 0
      },
      visible: true,
      available: true,
      minDuration: this.addProductForm.controls.minDuration.value,
      maxDuration: this.addProductForm.controls.maxDuration.value,
      reservationDeadline: this.addProductForm.controls.reservationDeadline.value,
      cancellationDeadline: this.addProductForm.controls.cancellationDeadline.value,
      automaticReservation: this.addProductForm.controls.automaticReservation.value,
      serviceProviderId: 2,//this.jwtService.getIdFromToken(),
      merchandisePhotos: this.getPhotos(),
      eventTypesIds: this.selectedEventTypes,
      categoryId: this.selectedCategory,
    }
    this.productService.create(dto).pipe(
      tap(response => {
      })
    ).subscribe()

  }

  showAddCategoryForm() {
    this.displayAddCategoryForm = true;
  }
  createCategory(categoryCreated: boolean) {
    if(categoryCreated) {
      this.categoryService.getAll();
    } 
    else {
      console.log("fail")
    } 

    this.displayAddCategoryForm = false;
  }
}
