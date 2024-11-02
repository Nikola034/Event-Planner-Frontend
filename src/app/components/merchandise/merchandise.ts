import { Address } from "../address/address";
import { Category } from "../category/category";

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
    category:Category,
    address:Address
}
