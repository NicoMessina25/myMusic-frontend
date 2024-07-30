import { CustomResponse } from "@/types/serverResponse";
import api from "./axios";
import { Profile } from "@/types/profile";

export function getProfiles():Promise<CustomResponse<Profile[]>>{
    return api.get("/api/profiles/").then(res => res.data)
}