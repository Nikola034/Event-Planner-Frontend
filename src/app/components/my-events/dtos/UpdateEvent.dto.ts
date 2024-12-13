import { AddressDTO } from "../../auth/register-dtos/address.dto";

export interface UpdateEventDTO {
    title: string | null | undefined;
    description: string | null | undefined;
    maxParticipants: number | null | undefined;
    isPublic: boolean | null | undefined;
    date: Date | null | undefined; 
    address: AddressDTO | null | undefined;
    eventTypeId: number | null | undefined; 
    productIds: (number | null | undefined)[] | null | undefined; 
    serviceIds: (number | null | undefined)[] | null | undefined;
  }