import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Category } from '../model/category';
import { CategoryDto } from '../model/category.dto';
import { CreateCategory } from '../model/create-request';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm!: FormGroup;
  @Output() categoryCreated = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.addCategoryForm = this.fb.group({
      title: [''],
      description: ['']
    });
  }

  onSubmit() {
    const createdCategory: CreateCategory = {
      title: this.addCategoryForm.value.title,
      description: this.addCategoryForm.value.description,
      pending: false
    };


    this.categoryService.create(createdCategory).subscribe({
      next: (response) => {
        this.categoryCreated.emit(true);
      },
      error: (err) => {
        this.categoryCreated.emit(false);
      }
    });

    this.addCategoryForm.reset();
  }
}
