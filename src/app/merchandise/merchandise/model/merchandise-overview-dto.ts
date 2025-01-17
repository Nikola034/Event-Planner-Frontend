import { Address } from "../../../shared/address/address";
import { MerchandisePhotoDTO } from "./merchandise-photo-response-dto";

export interface MerchandiseOverviewDTO {
    id: number | null | undefined;
    category: string | null | undefined;
    type: string | null | undefined;
    photos: MerchandisePhotoDTO[]
    title: string | null | undefined;
    rating: number | null | undefined;
    address: Address | null | undefined;
    price:number | null | undefined;
    description: string | null | undefined;
  }

  export interface GetAllByCaterogiesDTO{
    categories: number[] | null | undefined
  }
