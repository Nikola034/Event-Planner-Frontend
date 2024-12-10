export interface CreateCategory {
    title: string,
    description: string,
    pending: boolean,
    eventTypeIds: number[]
}