export interface Artist {
    name: string,
    artistId?: number
}

export const defaultArtist:Artist = {
    name: "",
    artistId: -1
}