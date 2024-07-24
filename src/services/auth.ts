import { APIURL } from "@/env";
import { LoginResponse } from "@/types/auth";
import { CustomResponse } from "@/types/serverResponse";
import { User } from "@/types/user";
import axios from "axios";
import { setCookie } from "./cookies";

export function authenticate(username:string, password:string):Promise<User | null>{
    return axios.post(APIURL + "/api/auth/login",{
        username,
        password
    }).then((res) => {    
        const resp:CustomResponse<LoginResponse> = res.data
        if (resp.success) {
            const data = resp.data
            setCookie("MYMUSIC", data.access_token, 1)
            setCookie("MYMUSICREFRESH", data.refresh_token, 30)
            return data.user
        }
        return null;
    }).catch(err => {
        return err
    })
}