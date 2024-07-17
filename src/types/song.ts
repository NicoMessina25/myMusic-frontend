import { Artist } from "./artist"
import { User } from "./user"

export interface Song {
    songId?:number
    title:string
    length:number
    releaseDate:Date | null
    artists:Artist[]
}

export const defaultSong:Song = {
    songId: -1,
    title: "",
    length: 0,
    releaseDate: null,
    artists:[]
}