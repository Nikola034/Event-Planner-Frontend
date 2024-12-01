import { Address } from "../address/address";

export interface EventOverviewDTO {
    id: number;
    type: string;
    title: string;
    date: Date;
    address: Address;
    description: string;
    public:boolean
}

