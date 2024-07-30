import { APIURL } from "@/env";
import { LoginResponse } from "@/types/auth";
import { CustomResponse } from "@/types/serverResponse";
import { User } from "@/types/user";
import axios, { AxiosError } from "axios";
import { setCookie } from "./cookies";
import api from "./axios";

export function authenticate(username:string, password:string):Promise<User | null>{
    return axios.post(APIURL + "/api/auth/login",{
        username,
        password
    }).then((res) => {    
        const resp:CustomResponse<LoginResponse> = res.data
        if (resp.success) {
            const data = resp.data
            localStorage.setItem("myMusicUser", JSON.stringify(data.user))
            setCookie("MYMUSIC", data.access_token, data.access_token_expires/(3600*24)) //los datos vienen en segundos
            setCookie("MYMUSICREFRESH", data.refresh_token, data.refresh_token_expires/(3600*24))
            return data.user
        }
        return null;
    }).catch(err => {
        return err
    })
}

export function register(username: string, password: string, email: string): Promise<CustomResponse> {
    return axios.post(APIURL + "/api/auth/register", {
        username,
        password,
        email
    }).then((res) => {
        const resp: CustomResponse = res.data;
        return resp;
    }).catch((err:AxiosError<CustomResponse>) => {
        return err.response?.data!;
    });
}

export function logout():Promise<CustomResponse>{
    return api.post('/api/auth/logout').then(res => {        
        return res.data
    }).catch(err => {
        console.error("Logout error: ", err);
    });
}