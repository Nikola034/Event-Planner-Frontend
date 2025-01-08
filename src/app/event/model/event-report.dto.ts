import { ReviewOverviewDTO } from "../../review/model/review-overview-dto";
import { UserOverviewDTO } from "../../user/model/user-overview-dto";

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
