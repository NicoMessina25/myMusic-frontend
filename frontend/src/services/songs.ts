import { Song } from "@/types/song";
import axios from "axios";

export function saveSong(song:Song){
    return axios.post("http://localhost:5000/api/songs/",song).then(res=>res.data)
}

export function getSongs(){
    return axios.get("http://localhost:5000/api/songs/").then(res => res.data).catch(error => console.log(error))
}