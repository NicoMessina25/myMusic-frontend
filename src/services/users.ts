import { CustomResponse } from "@/types/serverResponse";
import { User } from "@/types/user";
import { toISOString } from "./utils";
import api from "./axios";

export function saveUser(user:User):Promise<CustomResponse>{
    user.confirmPassword = undefined
    return api.post("/api/users/",user).then(res=>res.data)
}

export function getUsers():Promise<CustomResponse<User[]>>{
    return api.get("/api/users/").then(res => res.data)
}

export function getUserById(userId:number):Promise<CustomResponse<User>>{
    return api.get("/api/users/" + userId).then(res => res.data)
}

export function updateUser(user:User):Promise<CustomResponse>{
    user.confirmPassword = undefined
    return api.put("/api/users/", user).then(res=>res.data)
}

export function deleteUser(userId:number):Promise<CustomResponse>{
    return api.delete("/api/users/" + userId).then(res => res.data)
}