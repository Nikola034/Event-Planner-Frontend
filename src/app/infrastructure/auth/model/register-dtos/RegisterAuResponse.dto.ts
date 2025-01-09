import { AddressDTO } from "./address.dto";
import { Role } from "./role.dto";

export interface RegisterAuResponseDto {
    id: number,
    message:string,
    name: string;
    surname: string;
    phoneNumber: string;
    address: AddressDTO;
    email: string;
    password: string;
    photo: string;
    role: Role;
    accessToken: string,
    refreshToken: string
}