import { AddressDTO } from "../auth/register-dtos/address.dto";
import { CategoryDto } from "../category/category.dto";
import { EventType } from "../event/event-type";
import { MerchandisePhotoDTO } from "./merchandise-photo-response-dto";
import { MerchandiseReviewOverviewDTO } from "./merchandise-review-overview-dto";

export interface MerchandiseDetailDTO {
    id: number,
    title: string,
    description: string,
    specificity: string,
    price: number,
    discount: number,
    visible: boolean,
    available: boolean,
    minDuration: number,
    maxDuration: number,
    reservationDeadline: number,
    cancellationDeadline: number,
    merchandisePhotos: MerchandisePhotoDTO[],
    reviews: MerchandiseReviewOverviewDTO[],
    address: AddressDTO,
    category: CategoryDto,
    eventTypes: EventType,
    rating: number,
    serviceProviderId: number,
    type:string
}