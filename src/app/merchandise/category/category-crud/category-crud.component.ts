import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { EditCategoryComponent } from "../edit-category/edit-category.component";
import { AddCategoryComponent } from "../add-category/add-category.component";
import { DialogModule } from 'primeng/dialog';
import { CategoryService } from '../category.service';
import { CategoryDto } from '../model/category.dto';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ReplaceCategoryComponent } from "../replace-category/replace-category.component";

@Component({
  selector: 'app-category-crud',
  standalone: true,
  imports: [TableModule, ButtonModule, EditCategoryComponent, AddCategoryComponent, DialogModule, ToastModule, ReplaceCategoryComponent],
  templateUrl: './category-crud.component.html',
  styleUrl: './category-crud.component.scss',
  providers: [MessageService]
})
export class CategoryCrudComponent implements OnInit {
  addedCategories: CategoryDto[] = [];
  pendingCategories: CategoryDto[] = [];
  displayAddForm: boolean = false;
  selectedCategory!: CategoryDto;
  displayEditForm: boolean = false;
  displayReplaceForm: boolean = false;
  errorMessage: String = "";

  constructor(private categoryService: CategoryService, private messageService: MessageService) {}
  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllApproved().subscribe({
      next: (response) => {
        this.addedCategories = response;
      },
      error: (err) => {
        if (err.error && err.error.message) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Categories',
            detail: err.error.message
          });
        } else if (err.message) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Categories',
            detail: err.message
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Categories',
            detail: 'Failed to load Categories. Try reloading page.'
          });
        }
      }
    });

    this.categoryService.getAllPending().subscribe({
      next: (response) => {
        this.pendingCategories = response;
      },
      error: (err) => {
        if (err.error && err.error.message) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Categories',
            detail: err.error.message
          });
        } else if (err.message) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Categories',
            detail: err.message
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error loading Categories',
            detail: 'Failed to load Categories. Try reloading page.'
          });
        }
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

  showReplaceForm(category: CategoryDto) {
    this.selectedCategory = category;
    this.displayReplaceForm = true;
  }

  approveCategorySuggestion(category: CategoryDto) {
    this.categoryService.approve(category.id).subscribe({
      next: (response) => {
        this.getAllCategories();
      },
      error: (err) => {
        if (err.error && err.error.message) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error approving Category',
            detail: err.error.message
          });
        } else if (err.message) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error approving Category',
            detail: err.message
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error approving Category',
            detail: 'Failed to approve Category. Please try again.'
          });
        }
      }
    });
  }

  deleteCategory(category: CategoryDto) {
    this.categoryService.delete(category.id).subscribe({
      next: (response) => {
        this.getAllCategories();
      },
      error: (err) => {
        if (err.error && err.error.message) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error deleting Category',
            detail: err.error.message
          });
        } else if (err.message) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error deleting Category',
            detail: err.message
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error deleting Category',
            detail: 'Failed to delete Category. Try reloading page.'
          });
        }
      }
    });
  }

  updateCategory(categoryUpdated: boolean) {
    if(categoryUpdated) {
      this.getAllCategories();
    }
    else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to update category. Please try again.'
      });
    }

    this.displayEditForm = false;
  }

  replaceCategory(categoryReplaced: boolean) {
    if(categoryReplaced) {
      this.getAllCategories();
    }else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to replace category. Please try again.'
      });
    }

    this.displayReplaceForm = false;
  }

  createCategory(categoryCreated: boolean) {
    if(categoryCreated) {
      this.getAllCategories();
    }
    else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to create category. Please try again.'
      });
    }

    this.displayAddForm = false;
  }
}
