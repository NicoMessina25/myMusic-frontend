import { APIURL } from "@/env";
import { Artist } from "@/types/artist";
import { FetchProps } from "@/types/fetcher";
import { CustomResponse } from "@/types/serverResponse";
import axios from "axios";

export function getArtists(props?:FetchProps):Promise<CustomResponse<Artist[]>>{
    return axios.get(APIURL + "/api/artists/",{
        params: props
    }).then(res => res.data)
}

export function getArtistById(artistId:number):Promise<CustomResponse<Artist>>{
    return axios.get(APIURL + "/api/artists/" + artistId).then(res => res.data)
}
