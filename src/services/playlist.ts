import { CustomResponse } from "@/types/serverResponse";
import { Playlist } from "@/types/playlist";
import api from "./axios";
import { toISOString } from "./utils";

export function savePlaylist(playlist: Playlist): Promise<CustomResponse> {
    return api.post("/api/playlists/",{...playlist, created_at: toISOString(playlist.created_at)}).then(res => res.data);
}

export function getPlaylists(): Promise<CustomResponse<Playlist[]>> {
    return api.get("/api/playlists/").then(res => res.data);
}

export function getPlaylistById(playlistId: number): Promise<CustomResponse<Playlist>> {
    return api.get("/api/playlists/" + playlistId).then(res => res.data);
}

export function updatePlaylist(playlist: Playlist): Promise<CustomResponse> {
    return api.put("/api/playlists/",{...playlist, updated_at: toISOString(playlist.updated_at)}).then(res => res.data);
}

export function deletePlaylist(playlistId: number): Promise<CustomResponse> {
    return api.delete("/api/playlists/" + playlistId).then(res => res.data);
}
