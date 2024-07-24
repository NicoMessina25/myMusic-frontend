import { User } from "./user"

export interface LoginResponse {
    access_token: string
    access_token_expires: number
    refresh_token:string
    refresh_token_expires:number
    user: User|null
}

export interface RefreshResponse {
    access_token: string
    access_token_expires: number
}