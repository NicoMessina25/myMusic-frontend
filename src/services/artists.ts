import { APIURL } from "@/env";
import { Artist } from "@/types/artist";
import { CustomResponse } from "@/types/serverResponse";
import axios from "axios";

export function getArtists():Promise<CustomResponse<Artist[]>>{
    return axios.get(APIURL + "/api/artists/").then(res => res.data)
}

export function getArtistById(artistId:number):Promise<CustomResponse<Artist>>{
    return axios.get(APIURL + "/api/artists/" + artistId).then(res => res.data)
}
