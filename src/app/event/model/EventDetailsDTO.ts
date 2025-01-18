import { AddressDTO } from "../../infrastructure/auth/model/register-dtos/address.dto";
import { CreateEventTypeResponseDTO } from "../../event-type/create-event-type-form/dtos/create-event-type-response.dto";
import { EventOrganizerDTO } from "../my-events/dtos/CreateEventResponse.dto";
import { DetailsReviewOverviewDTO } from "../../merchandise/merchandise/model/merchandise-review-overview-dto";

export interface EventDetailsDTO{
  id: number;
  type: string;
  title: string;
  date: Date;
  address: AddressDTO;
  description: string;
  maxParticipants: number;
  eventType: CreateEventTypeResponseDTO;
  isPublic: boolean;
  organizer: EventOrganizerDTO;
  reviews: DetailsReviewOverviewDTO[];
}
