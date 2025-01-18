export interface ReviewRequestDTO {
    comment: string,
    rating: number,
    reviewerId: number,
    type: string
}

export enum ReviewType {
    MERCHANIDSE_REVIEW = "MERCHANDISE_REVIEW",
    EVENT_REVIEW = "EVENT_REVIEW"
}