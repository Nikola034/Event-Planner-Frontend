import { Address } from "../../../shared/address/address";
import { Category } from "../../category/model/category";
import { CreateCategory } from "../../category/model/create-request";
import { EventType } from "../../../event-type/event-type";
import { MerchandisePhotoDTO } from "../../merchandise/model/merchandise-photo-response-dto";

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
