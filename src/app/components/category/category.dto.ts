export interface GetAllCategoriesDto{
    categories: CategoryDto[]
}

export interface CategoryDto{
    id: number,
    title: string,
    description: string,
    pending: boolean
}