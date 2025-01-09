import { Address } from "../../shared/address/address";

export interface EventOverviewDTO {
    id: number;
    type: string;
    title: string;
    date: Date;
    address: Address;
    description: string;
    isPublic:boolean
}

