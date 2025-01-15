import { AddressDTO } from "../../../infrastructure/auth/model/register-dtos/address.dto";
import { CreateCategory } from "../../category/model/create-request";

export interface CreateRequest {
    title: string | null | undefined,
    description: string | null | undefined,
    specificity: string | null | undefined,
    price: number | null | undefined,
    discount: number | null | undefined,
    categoryId: number | null | undefined,
    eventTypesIds: number[] | null | undefined,
    minDuration: number | null | undefined,
    maxDuration: number | null | undefined,
    reservationDeadline: number | null | undefined,
    cancellationDeadline: number | null | undefined,
    automaticReservation: boolean | null | undefined,
    merchandisePhotos: number[] | null | undefined,
    address: AddressDTO | null | undefined,
    serviceProviderId: number | null | undefined
}
