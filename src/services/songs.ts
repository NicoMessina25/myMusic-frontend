import { APIURL } from "@/env";
import { Song } from "@/types/song";
import axios from "axios";

export function saveSong(song:Song){
    return axios.post(APIURL + "/api/songs/",song).then(res=>res.data)
}

export function getSongs(){
    return axios.get(APIURL + "/api/songs/").then(res => res.data).catch(error => console.log(error))
}