import { EventType } from "../../../event-type/event-type";
import { AddressDTO } from "../../../infrastructure/auth/model/register-dtos/address.dto";
import { Category } from "../../category/model/category";
import { MerchandisePhotoDTO } from "../../merchandise/model/merchandise-photo-response-dto";

export interface ServiceOverviewDTO {
    id: number,
    title: string,
    description: string;
    specificity: string;
    price: number;
    discount: number;
    visible: boolean;
    available: boolean;
    minDuration: number;
    maxDuration: number;
    reservationDeadline: number;
    cancellationDeadline: number;
    automaticReservation: boolean;
    deleted: boolean;
    merchandisePhotos: MerchandisePhotoDTO[];
    eventTypes: EventType[];
    category: Category;
    address: AddressDTO;
}