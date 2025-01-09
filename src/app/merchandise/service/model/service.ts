import { Merchandise } from "../../merchandise/model/merchandise";

export interface Service extends Merchandise {
    availableTimeslots:string
}
