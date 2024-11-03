import { Merchandise } from "../merchandise/merchandise";

export interface Service extends Merchandise {
    availableTimeslots:string
}
