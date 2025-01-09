import { ReviewStatus } from "./review-status";

export interface ReviewOverviewDTO {
    id: number;
    comment: string;
    rating: number;
    status: ReviewStatus;
    reviewedType: string;
    reviewedTitle: string;
    reviewerUsername: string;
    createdAt: Date;
  }