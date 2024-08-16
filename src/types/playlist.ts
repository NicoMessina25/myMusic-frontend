import { Song } from "./song";
import { User } from "./user";

export interface Playlist {
    playlistId?: number;
    name: string;
    description?: string;
    userId : number;
    created_at:Date | null
    updated_at:Date | null
    songs: Song[];
    user: User;
}

export const defaultPlaylist: Playlist = {
    playlistId: -1,
    name: "",
    description: "",
    userId: -1,
    created_at: null,
    updated_at: null,
    songs: [],
    user: {} as User,
};
