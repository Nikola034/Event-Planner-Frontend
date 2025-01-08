import { AddressDTO } from "../register-dtos/address.dto";

export interface UpdateAuDto {
    name: string;
    surname: string;
    phoneNumber: string;
    address: AddressDTO;
    photo: string;
}


