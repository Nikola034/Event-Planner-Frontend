import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CategoryDto } from '../category/category.dto';
import { CreateEventTypeResponseDTO } from '../create-event-type-form/dtos/create-event-type-response.dto';
import { EventTypeService } from '../create-event-type-form/event-type.service';
import { CategoryService } from '../category/category.service';
import { ProductService } from '../product/product.service';
import { response } from 'express';
import { tap } from 'rxjs';

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
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent {
  categories: CategoryDto[] = []
  eventTypes: CreateEventTypeResponseDTO[] = []

  addProductForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    specificity: new FormControl('', [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    discount: new FormControl(null, [Validators.min(0), Validators.max(100)]),
    category: new FormControl(null, [Validators.required]),
    eventTypes: new FormControl([]), 
    minDuration: new FormControl(null, [Validators.required, Validators.min(0)]),
    maxDuration: new FormControl(null, [Validators.required, Validators.min(0)]),
    duration: new FormControl(null), 
    reservationDeadline: new FormControl(null, [Validators.required, Validators.min(0)]),
    cancellationDeadline: new FormControl(null, [Validators.required, Validators.min(0)]),
    automaticReservation: new FormControl(false), 
  });

  constructor(private eventTypeService: EventTypeService, private categoryService: CategoryService, private productService: ProductService){

  }

  ngOnInit(){
    this.loadData();
  }

  loadData(): void{
    this.categoryService.getAllApproved().pipe(tap(response => {
      this.categories = response
    })).subscribe()
    this.eventTypeService.getAllWp().pipe(tap(response => {
      this.eventTypes = response
    })).subscribe()
  }

  uploadFile($event: Event) {
    throw new Error('Method not implemented.');
  }
}
