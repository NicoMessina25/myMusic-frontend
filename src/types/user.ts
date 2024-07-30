import { defaultProfile, EProfile, Profile } from "./profile"

export interface User {
    userId?:number
    username:string
    password:string
    confirmPassword?: string
    email?:string
    profile?:Profile
}

export const defaultUser:User = {
    username:"",
    password:"",
    confirmPassword:"",
    email:"",
    profile: defaultProfile
}