import { Address } from "../address/address";
import { AddressDTO } from "../auth/register-dtos/address.dto";
import { Category } from "../category/category";
import { EventType } from "../event/event-type";
import { Review } from "./review";

export interface Merchandise {
    id: number;
    title:string,
    description: string;
    specificity: string;
    price: number;
    discount: number;
    visible: boolean;
    available: boolean;
    minDuration: number;
    maxDuration: number;
    reservationDeadline: number;
    cancelReservation: number;
    automaticReservation: boolean;
    deleted: boolean;
    photos: string[];
    eventTypes: EventType[],
    category:Category,
    address:AddressDTO,
    reviews:Review[]
}
