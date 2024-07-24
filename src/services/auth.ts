import { APIURL } from "@/env";
import { LoginResponse } from "@/types/auth";
import { CustomResponse } from "@/types/serverResponse";
import { User } from "@/types/user";
import axios from "axios";
import { deleteCookie, setCookie } from "./cookies";
import api from "./axios";

export function authenticate(username:string, password:string):Promise<User | null>{
    return axios.post(APIURL + "/api/auth/login",{
        username,
        password
    }).then((res) => {    
        const resp:CustomResponse<LoginResponse> = res.data
        if (resp.success) {
            const data = resp.data
            setCookie("MYMUSIC", data.access_token, data.access_token_expires/(3600*24)) //los datos vienen en segundos
            setCookie("MYMUSICREFRESH", data.refresh_token, data.refresh_token_expires/(3600*24))
            return data.user
        }
        return null;
    }).catch(err => {
        return err
    })
}

export function logout(){
    api.post('/logout').then(() => {
        // Elimina las cookies que contienen los tokens
        deleteCookie('MYMUSIC');
        deleteCookie('MYMUSICREFRESH');
        
        
    }).catch(err => {
        console.error("Logout error: ", err);
    });
}