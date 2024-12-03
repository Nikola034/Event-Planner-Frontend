import { Component, Input, OnChanges, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Category } from '../category';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent implements OnChanges {
  @Input() categoryData!: Category;
  @Output() categoryUpdated = new EventEmitter<Category>();
  editCategoryForm!: FormGroup;

  constructor() {
    this.editCategoryForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl('')
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['categoryData'] && changes['categoryData'].currentValue) {
      const data = changes['categoryData'].currentValue;
      this.editCategoryForm.patchValue({
        title: data.title || '',
        description: data.description || ''
      })
    }
  }

  onSubmit() {
    const updatedCategory: Category = {
      ...this.categoryData,
      title: this.editCategoryForm.value.title,
      description: this.editCategoryForm.value.description
    };
    this.categoryUpdated.emit(updatedCategory as Category);
  }
}
