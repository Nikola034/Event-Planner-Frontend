import { CreateEventTypeResponseDTO } from "./create-event-type-response.dto";

export interface CreateEventTypeDTO {
    title: string | null | undefined;
    description: string | null | undefined;
    active: boolean;
    recommendedCategoryIds: number[] | null | undefined;
  }

export interface GetAllEventTypesDto{
  eventTypes: CreateEventTypeResponseDTO[]
}