import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CategoryDto, GetAllCategoriesDto } from '../category/category.dto';
import { CategoryService } from '../category/category.service';
import { tap } from 'rxjs';
import { CreateEventTypeDTO } from './dtos/create-event-type.dto';
import { EventTypeService } from './event-type.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { CreateEventTypeResponseDTO } from './dtos/create-event-type-response.dto';

@Component({
  selector: 'app-create-event-type-form',
  standalone: true,
  imports: [DropdownModule, FormsModule, MultiSelectModule, RadioButtonModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './create-event-type-form.component.html',
  styleUrl: './create-event-type-form.component.scss'
})
export class CreateEventTypeFormComponent{
  @Input() eventTypeData!: CreateEventTypeResponseDTO;
  @Output() eventTypeDataCreated = new EventEmitter<boolean>();
  addEventTypeForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  })
  categories: CategoryDto[] = []
  selectedCategories: any[] = [];

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private eventTypeService: EventTypeService, private router: Router) {
    
  }

  ngOnInit(){
    this.categoryService.getAllApproved().pipe(tap(response => {
      this.categories = response
    })).subscribe()
  }
  
  createEventType(): void{
    const dto: CreateEventTypeDTO = {
      title: this.addEventTypeForm.controls.title.value,
      description: this.addEventTypeForm.controls.description.value,
      recommendedCategoryIds: this.selectedCategories.map(x => x.id),
      active: true
    }
    this.eventTypeService.create(dto).pipe(
      tap(response => {
        this.eventTypeDataCreated.emit(true);
        this.router.navigate(['home/event-types']);
      })
    ).subscribe();
  }

 
}
