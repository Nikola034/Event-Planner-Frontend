import { ReviewStatus } from "../model/review-status";

export interface ReviewResponseDTO {
    id: number,
    comment: string,
    rating: number,
    reviewerId: number,
    status: ReviewStatus
}
