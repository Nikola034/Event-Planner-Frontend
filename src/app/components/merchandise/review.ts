import { User } from "../user/user";

export interface Review {
    id:number,
    user:User,
    comment:string,
    rating:number
}
