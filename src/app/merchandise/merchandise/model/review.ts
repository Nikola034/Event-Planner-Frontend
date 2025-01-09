import { User } from "../../../user/model/user";

export interface Review {
    id:number,
    user:User,
    comment:string,
    rating:number
}
