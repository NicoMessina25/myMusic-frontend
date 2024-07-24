import { CustomResponse } from "@/types/serverResponse";
import { Song } from "@/types/song";
import { toISOString } from "./utils";
import api from "./axios";

export function saveSong(song:Song):Promise<CustomResponse>{
    return api.post("/api/songs/",{...song, releaseDate: toISOString(song.releaseDate)}).then(res=>res.data)
}

export function getSongs():Promise<CustomResponse<Song[]>>{
    return api.get("/api/songs/").then(res => res.data)
}

export function getSongById(songId:number):Promise<CustomResponse<Song>>{
    return api.get("/api/songs/" + songId).then(res => res.data)
}

export function updateSong(song:Song):Promise<CustomResponse>{
    return api.put("/api/songs/", {...song, releaseDate: toISOString(song.releaseDate)}).then(res=>res.data)
}

export function deleteSong(songId:number):Promise<CustomResponse>{
    return api.delete("/api/songs/" + songId).then(res => res.data)
}