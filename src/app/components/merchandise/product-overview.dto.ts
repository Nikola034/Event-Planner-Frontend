import { AddressDTO } from "../auth/register-dtos/address.dto";
import { CategoryDto } from "../category/category.dto";
import { CreateEventTypeResponseDTO } from "../create-event-type-form/dtos/create-event-type-response.dto";
import { MerchandisePhotoDTO } from "./merchandise-photo-response-dto";

export interface ProductOverviewDTO {
  id: number;
  title: string;
  description: string;
  specificity: string;
  price: number;
  discount: number;
  visible: boolean;
  available: boolean;
  minDuration: number;
  maxDuration: number;
  reservationDeadline: number;
  cancelReservation: number; 
  automaticReservation: boolean;
  deleted: boolean;
  merchandisePhotos: MerchandisePhotoDTO[]; 
  eventTypes: CreateEventTypeResponseDTO[]; 
  category: CategoryDto;
  address: AddressDTO; 
  }
