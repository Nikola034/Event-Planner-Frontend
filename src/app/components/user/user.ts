import { Address } from "../address/address";

export interface User {
    id:number,
    name:string,
    surname:string,
    address:Address,
    phoneNumber:string,
    email:string,
    password:string,
    photo:string,
    active:boolean
}
