import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { BudgetService } from '../budget.service';
import { BudgetDTO } from '../model/budget-dto';
import { createBudgetRequestDTO } from '../model/add-budget-request-dto';
import { DropdownModule } from 'primeng/dropdown';
import { CategoryDto } from '../../../merchandise/category/model/category.dto';
import { CategoryService } from '../../../merchandise/category/category.service';

@Component({
  selector: 'app-add-budget-form',
  standalone: true,
  imports: [ButtonModule, FormsModule, ReactiveFormsModule, DropdownModule],
  templateUrl: './add-budget-form.component.html',
  styleUrl: './add-budget-form.component.scss'
})
export class AddBudgetFormComponent implements OnInit {
  addBudgetItem!: FormGroup;
  @Input() budgetId!: number;
  @Output() budgetCreated = new EventEmitter<BudgetDTO>();
  allCategories: CategoryDto[] = [];

  constructor(private fb: FormBuilder, private budgetService: BudgetService, private categoryService: CategoryService) {
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
        console.error(err);
      }
    });
  }

  onCategoryChange(event: any) {
    const selectedCategoryId = event.value?.id;
    this.addBudgetItem.patchValue({categoryId: selectedCategoryId});
  }

  isFormValid() {
    if(this.addBudgetItem.value.categoryId == null) {
      return false;
    }

    if(this.addBudgetItem.value.maxAmount == null || this.addBudgetItem.value.maxAmount < 0) {
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
          console.error(err);
        }
      });
    }
  }
}
