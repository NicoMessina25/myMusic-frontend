import { APIURL } from "@/env";
import { CustomResponse } from "@/types/serverResponse";
import { Song } from "@/types/song";
import axios from "axios";
import { toISOString } from "./utils";

export function saveSong(song:Song):Promise<CustomResponse>{
    return axios.post(APIURL + "/api/songs/",{...song, releaseDate: toISOString(song.releaseDate)}).then(res=>res.data)
}

export function getSongs():Promise<CustomResponse<Song[]>>{
    return axios.get(APIURL + "/api/songs/").then(res => res.data)
}

export function getSongById(songId:number):Promise<CustomResponse<Song>>{
    return axios.get(APIURL + "/api/songs/" + songId).then(res => res.data)
}

export function updateSong(song:Song):Promise<CustomResponse>{
    return axios.put(APIURL + "/api/songs/", {...song, releaseDate: toISOString(song.releaseDate)}).then(res=>res.data)
}

export function deleteSong(songId:number):Promise<CustomResponse>{
    return axios.delete(APIURL + "/api/songs/" + songId).then(res => res.data)
}