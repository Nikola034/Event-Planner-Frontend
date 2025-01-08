import { AddressDTO } from "../../../infrastructure/auth/model/register-dtos/address.dto";
import { CategoryDto } from "../../category/model/category.dto";
import { CreateEventTypeResponseDTO } from "../../../event-type/create-event-type-form/dtos/create-event-type-response.dto";
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
