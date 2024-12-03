import { Component } from '@angular/core';
import { Category } from '../category';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { EditCategoryComponent } from "../edit-category/edit-category.component";
import { AddCategoryComponent } from "../add-category/add-category.component";
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-category-crud',
  standalone: true,
  imports: [TableModule, ButtonModule, EditCategoryComponent, AddCategoryComponent, DialogModule],
  templateUrl: './category-crud.component.html',
  styleUrl: './category-crud.component.scss'
})
export class CategoryCrudComponent {
  displayAddForm: boolean = false;
  showAddCategoryForm() {
    this.displayAddForm = true;
  }

  selectedCategory!: Category;
  displayEditForm: boolean = false;
  showEditCategoryForm(category: Category) {
    this.selectedCategory = category;
    this.displayEditForm = true;
  }

  approveCategorySuggestion(category: Category) {
    this.pendingCategories = this.pendingCategories.filter(c => c.id !== category.id);

    if(!this.addedCategories.some(c => c.id === category.id)) {
      this.addedCategories.push(category);
    }
  }

  deleteExistingCategory(category: Category) {
    this.addedCategories = this.addedCategories.filter(c => c.id !== category.id);
  }

  deletePendingCategory(category: Category) {
    this.pendingCategories = this.pendingCategories.filter(c => c.id !== category.id);
  }
  
  addedCategories: Category[] = [
    {
      id: 1,
      title: 'vanue',
      description: 'place to celebrate your special day',
      pending: false
    },
    {
      id: 2,
      title: 'food',
      description: 'something to fil your stomach',
      pending: false
    },
    {
      id: 3,
      title: 'drinks',
      description: 'something to fil your stomach',
      pending: false
    }
  ];

  pendingCategories: Category[] = [
    {
      id: 4,
      title: 'decorations',
      description: 'something to makes your place nicer',
      pending: true
    },
    {
      id: 5,
      title: 'transportation',
      description: 'an easy way to make it to your event',
      pending: true
    }
  ]
}
