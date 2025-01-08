import { AddressDTO } from "../../../infrastructure/auth/model/register-dtos/address.dto";
import { CategoryDto } from "../../category/model/category.dto";
import { EventType } from "../../../event-type/event-type";
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
