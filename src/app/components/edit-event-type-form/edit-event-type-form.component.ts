import { Component } from '@angular/core';
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

@Component({
  selector: 'app-edit-event-type-form',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    MultiSelectModule,
    RadioButtonModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-event-type-form.component.html',
  styleUrl: './edit-event-type-form.component.scss',
})
export class EditEventTypeFormComponent {
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
      .getAll()
      .pipe(
        tap((response) => {
          this.categories = response.categories;
        })
      )
      .subscribe();

      let id: number | null = null;

      const eventTypeId = localStorage.getItem('eventTypeId');
      if (eventTypeId !== null) {
        id = parseInt(eventTypeId, 10);
      }
      this.eventTypeService.getById(1).pipe(tap(response => {
        this.editEventTypeForm.patchValue({
          title: response.title,
          description: response.description   
        });
        this.selectedCategories = response.recommendedCategories
      })).subscribe()
  }

  editEventType(): void {
    const dto: UpdateEventTypeDTO = {
      description: this.editEventTypeForm.controls.description.value,
      recommendedCategoryIds: this.selectedCategories.map((x) => x.id),
      active: true,
    };
    let id: number | null = null;

    const eventTypeId = localStorage.getItem('eventTypeId');
    if (eventTypeId !== null) {
      id = parseInt(eventTypeId, 10);
    }
    this.eventTypeService
      .update(id, dto)
      .pipe(
        tap((response) => {
          console.log(response);
        })
      )
      .subscribe();
  }
}
