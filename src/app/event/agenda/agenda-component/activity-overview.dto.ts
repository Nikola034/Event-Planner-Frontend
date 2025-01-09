import { AddressDTO } from "../../../infrastructure/auth/model/register-dtos/address.dto";

export interface ActivityOverviewDTO {
  id: number | null | undefined;
  title: string | null | undefined;
  description: string | null | undefined;
  startTime: Date | null | undefined;
  endTime: Date | null | undefined;
  address: AddressDTO | null | undefined
}

export interface CreateActivityDTO {
  title: string | null | undefined;
  description: string | null | undefined;
  startTime: Date | null | undefined;
  endTime: Date | null | undefined;
  address: AddressDTO | null | undefined
}
