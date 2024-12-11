import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { EditCategoryComponent } from "../edit-category/edit-category.component";
import { AddCategoryComponent } from "../add-category/add-category.component";
import { DialogModule } from 'primeng/dialog';
import { CategoryService } from '../category.service';
import { CategoryDto } from '../category.dto';
import { response } from 'express';

@Component({
  selector: 'app-category-crud',
  standalone: true,
  imports: [TableModule, ButtonModule, EditCategoryComponent, AddCategoryComponent, DialogModule],
  templateUrl: './category-crud.component.html',
  styleUrl: './category-crud.component.scss'
})
export class CategoryCrudComponent implements OnInit {
  addedCategories: CategoryDto[] = [];
  pendingCategories: CategoryDto[] = [];
  displayAddForm: boolean = false;
  selectedCategory!: CategoryDto;
  displayEditForm: boolean = false;
  displayError: boolean = false;
  errorMessage: String = "";

  constructor(private categoryService: CategoryService) {}
  ngOnInit() {
    this.categoryService.getAllApproved().subscribe({
      next: (response) => {
        this.addedCategories = response;
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.categoryService.getAllPending().subscribe({
      next: (response) => {
        this.pendingCategories = response;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getAllCategories() {
    this.categoryService.getAllApproved().subscribe({
      next: (response) => {
        this.addedCategories = response;
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.categoryService.getAllPending().subscribe({
      next: (response) => {
        this.pendingCategories = response;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  showAddCategoryForm() {
    this.displayAddForm = true;
  }

  showEditCategoryForm(category: CategoryDto) {
    this.selectedCategory = category;
    this.displayEditForm = true;
  }

  approveCategorySuggestion(category: CategoryDto) {
    this.categoryService.approve(category.id).subscribe({
      next: (response) => {
        this.getAllCategories();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  deleteCategory(category: CategoryDto) {
    this.categoryService.delete(category.id).subscribe({
      next: (response) => {
        this.getAllCategories();
      },
      error: (err) => {
        this.displayError = true;
        this.errorMessage = err.error.message;
        console.error(err.error.message);
      }
    });
  }

  updateCategory(categoryUpdated: boolean) {
    if(categoryUpdated) {
      this.getAllCategories();
    }
    else {
      this.displayError = true;
      this.errorMessage = "Failed to update category!";
    }

    this.displayEditForm = false;
  }

  createCategory(categoryCreated: boolean) {
    if(categoryCreated) {
      this.getAllCategories();
    } 
    else {
      this.displayError = true;
      this.errorMessage = "Failed to create category!";
    } 

    this.displayAddForm = false;
  }
}
