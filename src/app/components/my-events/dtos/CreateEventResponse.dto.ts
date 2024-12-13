import { AddressDTO } from "../../auth/register-dtos/address.dto";
import { CategoryDto } from "../../category/category.dto";
import { CreateEventTypeResponseDTO } from "../../create-event-type-form/dtos/create-event-type-response.dto";

export interface CreateEventResponseDTO {
    id: number;
    title: string;
    description: string;
    maxParticipants: number;
    isPublic: boolean;
    date: Date; // ISO string format for LocalDateTime
    address: AddressDTO; // Embeddable Address representation
    eventType: CreateEventTypeResponseDTO; // Event type overview
    products: GetProductByIdResponseDTO[]; // Selected products
    services: GetServiceByIdResponseDTO[]; // Selected services
    organizer: EventOrganizerDTO; // Event organizer details
  }

  export interface EventOrganizerDTO {
    id: number;
    name: string;
    surname: string;
    email: string;
  }

  export interface GetProductByIdResponseDTO {
    id: number | null | undefined;
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
    deleted: boolean | null | undefined;
    serviceProvider: EventOrganizerDTO | null | undefined; // Assuming a corresponding DTO/interface for ServiceProvider
    photos: MerchandisePhotoDTO[] | null | undefined; // Assuming a DTO/interface for MerchandisePhoto
    eventTypes: CreateEventTypeResponseDTO[] | null | undefined; // Assuming a DTO/interface for EventType
    address: AddressDTO | null | undefined; // Assuming a DTO/interface for Address
    category: CategoryDto | null | undefined; // Assuming a DTO/interface for Category
  }

  export interface GetServiceByIdResponseDTO {
    id: number | null | undefined;
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
    deleted: boolean | null | undefined;
    serviceProvider: EventOrganizerDTO | null | undefined; // Assuming a corresponding DTO/interface for ServiceProvider
    photos: MerchandisePhotoDTO[] | null | undefined; // Assuming a DTO/interface for MerchandisePhoto
    eventTypes: CreateEventTypeResponseDTO[] | null | undefined; // Assuming a DTO/interface for EventType
    address: AddressDTO | null | undefined; // Assuming a DTO/interface for Address
    category: CategoryDto | null | undefined; // Assuming a DTO/interface for Category
    timeslots: TimeslotDTO[] | null | undefined; // Assuming a DTO/interface for Timeslot
  }

  export interface TimeslotDTO {
    id: number; // Assuming `Long` in Java maps to `number` in TypeScript
    startTime: string; // ISO 8601 format (e.g., "2024-12-09T14:30:00")
    endTime: string; // ISO 8601 format (e.g., "2024-12-09T16:00:00")
  }

  export interface MerchandisePhotoDTO {
    id: number; // The ID of the photo
    photo: string; // Base64 or URL representation of the photo
  }