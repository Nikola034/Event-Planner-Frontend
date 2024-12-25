import { BudgetItemCategoryDTO } from "../category/category.dto";
import { MerchandiseOverviewDTO } from "../merchandise/merchandise-overview-dto";

export interface BudgetItemDTO {
    id: number,
    category: BudgetItemCategoryDTO,
    maxAmount: number,
    amountSpent: number,
    merchandise: MerchandiseOverviewDTO | null
}