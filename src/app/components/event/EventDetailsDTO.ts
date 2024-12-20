import { AddressDTO } from "../auth/register-dtos/address.dto";
import { CreateEventTypeResponseDTO } from "../create-event-type-form/dtos/create-event-type-response.dto";
import { EventOrganizerDTO } from "../my-events/dtos/CreateEventResponse.dto";

export interface EventDetailsDTO{
    id: number;
  type: string;
  title: string;
  date: Date; 
  address: AddressDTO;
  description: string;
  maxParticipants: number;
  eventType: CreateEventTypeResponseDTO;
  public: boolean;
  organizer: EventOrganizerDTO;
}