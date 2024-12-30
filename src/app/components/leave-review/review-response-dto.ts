import { ReviewStatus } from "../admin-reviews/review-status";

export interface ReviewResponseDTO {
    id: number,
    comment: string,
    rating: number,
    reviewerId: number,
    status: ReviewStatus
}