import { CustomResponse } from "@/types/serverResponse";
import { Playlist } from "@/types/playlist";
import api from "./axios";

export function savePlaylist(playlist: Playlist): Promise<CustomResponse> {
    return api.post("/api/playlists/",{...playlist}).then(res => res.data);
}

export function getPlaylists(): Promise<CustomResponse<Playlist[]>> {
    return api.get("/api/playlists/").then(res => res.data);
}

export function getPlaylistById(playlistId: number): Promise<CustomResponse<Playlist>> {
    return api.get("/api/playlists/" + playlistId).then(res => res.data);
}

export function updatePlaylist(playlist: Playlist): Promise<CustomResponse> {
    return api.put("/api/playlists/",{...playlist}).then(res => res.data);
}

export function deletePlaylist(playlistId: number): Promise<CustomResponse> {
    return api.delete("/api/playlists/" + playlistId).then(res => res.data);
}

export function addSong(playlistId: number, songId:number):Promise<CustomResponse>{
    return api.post("/api/playlist/addSong/",{
        playlistId,
        songId
    }).then(res => res.data)
}

export function deleteSong(playlistId: number, songId:number):Promise<CustomResponse>{
    return api.post("/api/playlist/deleteSong/",{
        playlistId,
        songId
    }).then(res => res.data)
}
