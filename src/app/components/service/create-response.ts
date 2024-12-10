import { Address } from "../address/address";
import { Category } from "../category/category";
import { CreateCategory } from "../category/create-request";
import { EventType } from "../event/event-type";
import { MerchandisePhotoDTO } from "../merchandise/merchandise-photo-response-dto";

export interface CreateServiceResponse {
    id: number,
    title: string,
    description: string,
    specificity: string,
    price: number,
    discount: number,
    visible: boolean,
    available: boolean,
    category: Category,
    eventTypes: EventType[],
    minDuration: number,
    maxDuration: number,
    reservationDeadline: number,
    cancellationDeadline: number,
    automaticReservation: boolean,
    photos: MerchandisePhotoDTO[],
    address: Address,
    serviceProviderId: number
}