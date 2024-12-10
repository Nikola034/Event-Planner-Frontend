import { AddressDTO } from "../../auth/register-dtos/address.dto";

export interface UpdateEventDTO {
    title: string;
    description: string;
    maxParticipants: number;
    isPublic: boolean;
    date: string; 
    address: AddressDTO;
    eventTypeId: number; 
    productIds: number[]; 
    serviceIds: number[];
  }