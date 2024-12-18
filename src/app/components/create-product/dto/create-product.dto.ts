import { AddressDTO } from "../../auth/register-dtos/address.dto";
import { CreateCategoryDto } from "../../category/category.dto";
import { CreateMerchandisePhotoDTO } from "../../merchandise/merchandise-photos-request-dto";

export interface CreateProductRequestDTO {
    title: string | null | undefined;
    description: string | null | undefined;
    specificity: string | null | undefined;
    price: number | null | undefined;
    discount: number | null | undefined;
    visible: boolean | null | undefined;
    available: boolean | null | undefined;
    minDuration: number | null | undefined;
    maxDuration: number | null | undefined;
    reservationDeadline: number | null | undefined;
    cancellationDeadline: number | null | undefined;
    automaticReservation: boolean | null | undefined;
  
    serviceProviderId: number | null | undefined;
    merchandisePhotos: number[] | null | undefined; 
    eventTypesIds: number[] | null | undefined; 
    address: AddressDTO | null | undefined; 
    categoryId: number | null | undefined; 
  }
  export interface UpdateProductRequestDTO {
    title: string | null | undefined;
    description: string | null | undefined;
    specificity: string | null | undefined;
    price: number | null | undefined;
    discount: number | null | undefined;
    visible: boolean | null | undefined;
    available: boolean | null | undefined;
    minDuration: number | null | undefined;
    maxDuration: number | null | undefined;
    reservationDeadline: number | null | undefined;
    cancellationDeadline: number | null | undefined;
    automaticReservation: boolean | null | undefined;
  
    serviceProviderId: number | null | undefined;
    merchandisePhotos: number[] | null | undefined; 
    eventTypesIds: number[] | null | undefined; 
    address: AddressDTO | null | undefined; 
  }