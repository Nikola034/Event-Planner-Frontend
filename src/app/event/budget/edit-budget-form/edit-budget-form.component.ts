import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { BudgetService } from '../budget.service';
import { UpdateBudgetRequestDTO } from '../model/update-budget-request-dto';
import { MessageService } from 'primeng/api';
import { BudgetDTO } from '../model/budget-dto';
@Component({
  selector: 'app-edit-budget-form',
  standalone: true,
  imports: [ButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-budget-form.component.html',
  styleUrl: './edit-budget-form.component.scss'
})
export class EditBudgetFormComponent {
  editBudget!: FormGroup;
  @Input() budgetItemId!: number;
  @Input() budgetId!: number;
  @Output() budgetUpdated = new EventEmitter<BudgetDTO>();
  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.editBudget = this.fb.group({
      maxAmount: [null]
    });
  }

  isInputValid(maxAmount: number) {
    return maxAmount !== null && maxAmount > 0;
  }

  onSubmit() {
    if(this.isInputValid(this.editBudget.value.maxAmount)) {
      const updateBudgetRequestDTO: UpdateBudgetRequestDTO = {
        budgetId: this.budgetId,
        price: this.editBudget.value.maxAmount
      }

      this.budgetService.updateBudgetItem(this.budgetItemId, updateBudgetRequestDTO).subscribe({
        next: (response) => {
          this.budgetUpdated.emit(response);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}
