export interface GetAllCategoriesDto{
    categories: CategoryDto[]
}

export interface CategoryDto{
    id: number,
    title: string,
    description: string,
    pending: boolean
}

export interface CreateCategoryDto{
    title: string,
    description: string,
    pending: boolean
}