import { Artist } from "@/types/artist";
import { FetchProps } from "@/types/fetcher";
import { CustomResponse } from "@/types/serverResponse";
import api from "./axios";

export function getArtists(props?:FetchProps):Promise<CustomResponse<Artist[]>>{
    return api.get("/api/artists/",{
        params: props
    }).then(res => res.data)
}

export function getArtistById(artistId:number):Promise<CustomResponse<Artist>>{
    return api.get("/api/artists/" + artistId).then(res => res.data)
}