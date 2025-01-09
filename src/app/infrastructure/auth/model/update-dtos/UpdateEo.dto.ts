import { AddressDTO } from "../register-dtos/address.dto";

export interface UpdateEoDto {
    name: string | null | undefined;
    surname: string | null | undefined;
    phoneNumber: string | null | undefined;
    address: AddressDTO | null | undefined;
    photo: string | null | undefined;
}
