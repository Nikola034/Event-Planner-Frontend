import { Address } from "../address/address";

export interface MerchandiseOverviewDTO {
    id: number | null | undefined;
    category: string | null | undefined;
    type: string | null | undefined;
    photo: Uint8Array | null | undefined; // Equivalent to byte[] in Java
    title: string | null | undefined;
    rating: number | null | undefined;
    address: Address | null | undefined;
    price:number | null | undefined;
    description: string | null | undefined;
  }

  export interface GetAllByCaterogiesDTO{
    categories: number[] | null | undefined
  }