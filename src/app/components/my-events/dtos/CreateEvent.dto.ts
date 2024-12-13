import { AddressDTO } from "../../auth/register-dtos/address.dto";

export interface CreateEventDTO {
    title: string | null | undefined;
    description: string | null | undefined;
    maxParticipants: number | null | undefined;
    isPublic: boolean | null | undefined;
    date: Date | null | undefined; 
    address: AddressDTO | null | undefined;
    eventTypeId: number | null | undefined; 
    productIds: number[] | null | undefined; 
    serviceIds: number[] | null | undefined;
    organizerId: number | null | undefined;
  }