import { AddressDTO } from "../register-dtos/address.dto";
import { Role } from "../register-dtos/role.dto";
export interface UpdateSpDto {
    name: string | null | undefined;
    surname: string | null | undefined;
    phoneNumber: string | null | undefined;
    address: AddressDTO | null | undefined;
    photo: string | null | undefined;

    description: string | null | undefined,
    photos: number[] | null | undefined
}
