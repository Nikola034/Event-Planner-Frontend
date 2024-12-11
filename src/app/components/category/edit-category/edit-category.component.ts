import { Component, Input, OnChanges, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Category } from '../category';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { UpdateCategory } from '../update-request';
import { CategoryService } from '../category.service';
import { CategoryDto } from '../category.dto';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent implements OnChanges {
  @Input() categoryData!: CategoryDto;
  @Output() categoryUpdated = new EventEmitter<boolean>();
  editCategoryForm!: FormGroup;

  constructor(private categoryService: CategoryService) {
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
    const updatedCategory: UpdateCategory = {
      title: this.editCategoryForm.value.title,
      description: this.editCategoryForm.value.description,
      pending: this.categoryData.pending
    };
    console.log("uslo u funkciju");
    console.log(this.categoryData.id);
    this.categoryService.update(this.categoryData.id, updatedCategory).subscribe({
      next: (response) => {
        this.categoryUpdated.emit(true);
      },
      error: (err) => {
        this.categoryUpdated.emit(false);
      }
    });
  }
}
