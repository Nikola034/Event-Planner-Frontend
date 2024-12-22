import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { tap } from 'rxjs';
import { CategoryDto } from '../category/category.dto';
import { CategoryService } from '../category/category.service';
import { EventTypeService } from '../create-event-type-form/event-type.service';
import { UpdateEventTypeDTO } from '../create-event-type-form/dtos/update-event-type.dto';
import { parse } from 'path';
import { response } from 'express';
import { CreateEventTypeResponseDTO } from '../create-event-type-form/dtos/create-event-type-response.dto';

@Component({
  selector: 'app-edit-event-type-form',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    MultiSelectModule,
    RadioButtonModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-event-type-form.component.html',
  styleUrl: './edit-event-type-form.component.scss',
})
export class EditEventTypeFormComponent implements OnChanges{
  @Input() eventTypeData!: CreateEventTypeResponseDTO;
  @Output() eventTypeDataUpdated = new EventEmitter<boolean>();
  editEventTypeForm = new FormGroup({
    title: new FormControl({ value: '', disabled: true }),
    description: new FormControl(''),
  });
  categories: CategoryDto[] = [];
  selectedCategories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private eventTypeService: EventTypeService
  ) {}

  ngOnInit() {
    this.categoryService
      .getAllApproved()
      .pipe(
        tap((response) => {
          this.categories = response;
        })
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['eventTypeData'] && changes['eventTypeData'].currentValue) {
      const data = changes['eventTypeData'].currentValue;
      this.editEventTypeForm.patchValue({
        title: this.eventTypeData.title,
        description:  this.eventTypeData.description, 
      });
    }
  }

  editEventType(): void {
    const dto: UpdateEventTypeDTO = {
      description: this.editEventTypeForm.controls.description.value,
      recommendedCategoryIds: this.selectedCategories.map((x) => x.id),
      active: true,
    };
    this.eventTypeService
      .update(this.eventTypeData.id, dto)
      .pipe(
        tap((response) => {
          
        })
      )
      .subscribe();
  }
}
