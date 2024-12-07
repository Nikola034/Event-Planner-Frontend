import { AddressDTO } from "./address.dto";
import { Role } from "./role.dto";

export interface RegisterSpResponseDto {
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

    company: string,
    description: string,
    photos: string[]
}