export enum EProfile {
    ADMIN = 1,
    ADMINISTRATIVE = 2,
    PUBLIC = 3
}

export interface Profile {
    profileId?:number
    name:string
}

export const defaultProfile:Profile = {
    name:""
}
    