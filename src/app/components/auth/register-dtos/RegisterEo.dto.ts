import { AddressDTO } from "./address.dto";
import { Role } from "./role.dto";

export interface RegisterEoDto {
    name: string | null | undefined;
    surname: string | null | undefined;
    phoneNumber: string | null | undefined;
    address: AddressDTO | null | undefined;
    email: string | null | undefined;
    password: string | null | undefined;
    photo: string | null | undefined;
    role: string | null | undefined;
}
  