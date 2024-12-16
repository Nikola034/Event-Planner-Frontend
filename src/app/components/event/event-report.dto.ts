import { ReviewOverviewDTO } from "../admin-reviews/review-overview-dto";
import { UserOverviewDTO } from "../user/user-overview-dto";

export interface EventReportDTO{
    participants: UserOverviewDTO[],
    reviews: ReviewDTO[]
}

export interface ReviewDTO{
    id: number,
    comment: string,
    rating: number,
    status: boolean
}