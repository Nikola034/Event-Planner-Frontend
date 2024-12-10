import { Address } from "../address/address";
import { CreateCategory } from "../category/create-request";
import { CreateMerchandisePhotoDTO } from "../merchandise/merchandise-photos-request-dto";

export interface CreateRequest {
    title: string,
    description: string,
    specificity: string,
    price: number,
    discount: number,
    categoryId: number,
    category: CreateCategory,
    eventTypesIds: number[],
    minDuration: number,
    maxDuration: number,
    reservationDeadline: number,
    cancellationDeadline: number,
    automaticReservation: boolean,
    merchandisePhotos: CreateMerchandisePhotoDTO[],
    address: Address,
    serviceProviderId: number
}