import { BudgetItemCategoryDTO } from "../../../merchandise/category/model/category.dto";
import { MerchandiseOverviewDTO } from "../../../merchandise/merchandise/model/merchandise-overview-dto";

export interface BudgetItemDTO {
    id: number,
    category: BudgetItemCategoryDTO,
    maxAmount: number,
    amountSpent: number,
    merchandise: MerchandiseOverviewDTO | null
}
