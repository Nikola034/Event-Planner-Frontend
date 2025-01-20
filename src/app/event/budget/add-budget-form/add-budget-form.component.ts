import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { BudgetService } from '../budget.service';
import { BudgetDTO } from '../model/budget-dto';
import { createBudgetRequestDTO } from '../model/add-budget-request-dto';
import { DropdownModule } from 'primeng/dropdown';
import { CategoryDto } from '../../../merchandise/category/model/category.dto';
import { CategoryService } from '../../../merchandise/category/category.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-add-budget-form',
  standalone: true,
  imports: [ButtonModule, FormsModule, ReactiveFormsModule, DropdownModule, ToastModule],
  templateUrl: './add-budget-form.component.html',
  styleUrl: './add-budget-form.component.scss',
  providers: [MessageService]
})
export class AddBudgetFormComponent implements OnInit {
  addBudgetItem!: FormGroup;
  @Input() budgetId!: number;
  @Output() budgetCreated = new EventEmitter<BudgetDTO>();
  allCategories: CategoryDto[] = [];

  constructor(private fb: FormBuilder, private budgetService: BudgetService, private categoryService: CategoryService, private messageService: MessageService) {
    this.addBudgetItem = this.fb.group({
      categoryId: [null],
      maxAmount: [null],
    });
  }

  ngOnInit(): void {
    this.categoryService.getAllApproved().subscribe({
      next: (response) => {
        this.allCategories = response;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load categories. Please try again.'
        });
      }
    });
  }

  onCategoryChange(event: any) {
    const selectedCategoryId = event.value?.id;
    this.addBudgetItem.patchValue({categoryId: selectedCategoryId});
  }

  isFormValid() {
    if(this.addBudgetItem.value.categoryId == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Form field not valid',
        detail: 'Category field cannot be empty!'
      });
      return false;
    }

    if(this.addBudgetItem.value.maxAmount == null || this.addBudgetItem.value.maxAmount < 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Form field not valid',
        detail: 'Maximum amount must be number greater than 0!'
      });
      return false;
    }

    return true;
  }

  onSubmit() {
    if(this.isFormValid()) {
      const requestDTO: createBudgetRequestDTO = {
        ...this.addBudgetItem.value
      }

      this.budgetService.createBudgetItem(this.budgetId, requestDTO).subscribe({
        next: (response) => {
          this.budgetCreated.emit(response);
          this.addBudgetItem.reset();
        },
        error: (err) => {
          if (err.error && err.error.message) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error creating Budget Item',
              detail: err.error.message
            });
          } else if (err.message) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error creating Budget Item',
              detail: err.message
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error creating Budget Item',
              detail: 'Failed to create Budget Item. Please try again.'
            });
          }
        }
      });
    }
  }
}
