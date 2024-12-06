import { AddressDTO } from "../../register-dtos/address.dto";
import { Role } from "../../register-dtos/role.dto";

export interface UpdateAuResponseDto {
    id: number,
    message:string,
    name: string;
    surname: string;
    phoneNumber: string;
    address: AddressDTO;
    email: string;
    photo: string;
    role: Role;
}