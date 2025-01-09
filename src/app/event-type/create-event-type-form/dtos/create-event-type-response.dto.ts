import { CategoryDto } from "../../../merchandise/category/model/category.dto";

export interface CreateEventTypeResponseDTO {
    id: number,
    title: string;
    description: string;
    active: boolean;
    recommendedCategories: CategoryDto[];
  }
