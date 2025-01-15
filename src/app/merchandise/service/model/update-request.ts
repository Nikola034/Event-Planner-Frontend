import { AddressDTO } from "../../../infrastructure/auth/model/register-dtos/address.dto";
import { CreateMerchandisePhotoDTO } from "../../merchandise/model/merchandise-photos-request-dto";

export interface UpdateRequest {
    title: string|null|undefined,
    description: string|null|undefined,
    specificity: string|null|undefined,
    price: number|null|undefined,
    discount: number|null|undefined,
    eventTypesIds: number[]|null|undefined,
    minDuration: number|null|undefined,
    maxDuration: number|null|undefined,
    reservationDeadline: number|null|undefined,
    cancellationDeadline: number|null|undefined,
    automaticReservation: boolean|null|undefined,
    visible: boolean|null|undefined,
    available: boolean|null|undefined,
    photos: number[]|null|undefined,
    serviceProviderId: number|null|undefined,
    address: AddressDTO|null|undefined
}
