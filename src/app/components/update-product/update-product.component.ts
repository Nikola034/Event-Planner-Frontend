import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { tap } from 'rxjs';
import { JwtService } from '../auth/jwt.service';
import { CategoryDto } from '../category/category.dto';
import { CategoryService } from '../category/category.service';
import { RecommendCategoryComponent } from '../category/recommend-category/recommend-category.component';
import { CreateEventTypeResponseDTO } from '../create-event-type-form/dtos/create-event-type-response.dto';
import { EventTypeService } from '../create-event-type-form/event-type.service';
import { CreateProductRequestDTO, UpdateProductRequestDTO } from '../create-product/dto/create-product.dto';
import { CreateMerchandisePhotoDTO } from '../merchandise/merchandise-photos-request-dto';
import { ProductService } from '../product/product.service';
import { MerchandiseService } from '../merchandise/merchandise.service';
import { response } from 'express';

@Component({
  selector: 'app-update-product',
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
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
  categories: CategoryDto[] = []
  eventTypes: CreateEventTypeResponseDTO[] = []
  displayAddCategoryForm: boolean = false;

  selectedCategory: any = null
  selectedEventTypes: CreateEventTypeResponseDTO[] = []

  fbl: FormBuilder = new FormBuilder();

  addProductForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    specificity: new FormControl('', [Validators.required]),
    price: new FormControl<number | undefined | null>(null, [Validators.required, Validators.min(0)]),
    discount: new FormControl<number | undefined | null>(null, [Validators.min(0), Validators.max(100)]),
    city: new FormControl<string | undefined | null>(null, [Validators.required]),
    street: new FormControl<string | undefined | null>(null, [Validators.required]),
    number: new FormControl<number | undefined | null>(null, [Validators.required]),
    eventTypes: new FormControl([]), 
    minDuration: new FormControl<number | undefined | null>(null, [Validators.required, Validators.min(0)]),
    maxDuration: new FormControl<number | undefined | null>(null, [Validators.required, Validators.min(0)]),
    duration: new FormControl(null), 
    reservationDeadline: new FormControl<number | undefined | null>(null, [Validators.required, Validators.min(0)]),
    cancellationDeadline: new FormControl<number | undefined | null>(null, [Validators.required, Validators.min(0)]),
    automaticReservation: new FormControl(false),
    merchandisePhotos: this.fbl.array([])
  });

  constructor(private eventTypeService: EventTypeService, private categoryService: CategoryService, private productService: ProductService, private jwtService: JwtService, private fb: FormBuilder
  ){

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
    this.productService.getById(history.state.productId).pipe(tap(response => {
      this.addProductForm.patchValue({
        title: response.title,
        description: response.description,
        specificity: response.specificity,
        price: response.price,
        discount: response.discount,
        city: response.address?.city,
        street: response.address?.street,
        number: response.address?.number,
        minDuration: response.minDuration,
        maxDuration: response.maxDuration,
        reservationDeadline: response.reservationDeadline,
        cancellationDeadline: response.cancelReservation,
        automaticReservation: response.automaticReservation,
      });
    })).subscribe()
  }

  uploadFile($event: any): void {
    const files = $event.target.files as File[];
    if (files && files.length > 0) {
      Array.from(files).forEach((file: File) => {
        this.addPhoto(file.name); 
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
    const dto: UpdateProductRequestDTO = {
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
      eventTypesIds: this.eventTypes.map(x => x.id),
    }
    this.productService.update(history.state.productId
      , dto).pipe(
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
