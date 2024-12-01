import { Address } from "../address/address";

export interface MerchandiseOverviewDTO {
    id: number;
    category: string;
    type: string;
    photo: Uint8Array; // Equivalent to byte[] in Java
    title: string;
    rating: number;
    address: Address;
    price:number;
    description: string;
  }
