import { Address } from "../address/address";
import { CreateCategory } from "../category/create-request";
import { CreateMerchandisePhotoDTO } from "../merchandise/merchandise-photos-request-dto";

export interface UpdateRequest {
    title: string,
    description: string,
    specificity: string,
    price: number,
    discount: number,
    eventTypesIds: number[],
    minDuration: number,
    maxDuration: number,
    reservationDeadline: number,
    cancellationDeadline: number,
    automaticReservation: boolean,
    visible: boolean,
    available: boolean,
    photos: CreateMerchandisePhotoDTO[],
    serviceProviderId: number,
    address: Address
}