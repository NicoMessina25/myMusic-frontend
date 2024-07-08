import { User } from "./user"

export interface Song {
    id?:number
    title:string
    length:number
    year:number
    director:string
    actors:User[]
}