import { BudgetItemDTO } from "./budget-item-dto";

export interface BudgetDTO {
    budgetId: number,
    maxAmount: number,
    spentAmount: number,
    budgetItems: BudgetItemDTO[]
}