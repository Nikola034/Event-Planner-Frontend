import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Category } from '../category';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm!: FormGroup;
  @Output() categoryCreated = new EventEmitter<Category>();

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.addCategoryForm = this.fb.group({
      title: [''],
      description: ['']
    });
  }

  onSubmit() {
    const createdCategory: Category = {
      id: this.generateId(),
      title: this.addCategoryForm.value.title,
      description: this.addCategoryForm.value.description,
      pending: false
    };
    this.categoryCreated.emit(createdCategory);
  }

  generateId() { //temporary helper function that generates category id, this will be removed after connecting frontend with backend
    return 6;
  }
}
