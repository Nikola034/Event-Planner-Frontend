import { AddressDTO } from "./address.dto";
import { Role } from "./role.dto";

export interface RegisterAuDto {
    name: string;
    surname: string;
    phoneNumber: string;
    address: AddressDTO;
    email: string;
    password: string;
    photo: string;
    role: string;
}
  
  
 