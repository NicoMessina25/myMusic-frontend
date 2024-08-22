import { getPlaylistSongs, getPlaylistSongsToAdd } from '@/services/playlist'
import { defaultFetcherState, FetcherState, FetchProps } from '@/types/fetcher'
import { Song } from '@/types/song'
import { error } from 'console'
import React, { useEffect, useState } from 'react'

export default function usePlaylistSongs(playlistId:number, initialProps?:FetchProps) {
    const [songsState, setSongsState] = useState<FetcherState<Song>>(defaultFetcherState([]))
    const [songsToAddState, setSongsToAddState] = useState<FetcherState<Song>>(defaultFetcherState([]))

    useEffect(()=>{
        if(!Number.isNaN(playlistId)){
            setSongsState({...songsState, loading:true})
            fetch(initialProps)
            fetchSongsToAdd({
                limit:15
            })
        }
    },[playlistId])

    function fetch(props?:FetchProps){
        getPlaylistSongs(playlistId, props).then(res=>{
            if(res.success)
                setSongsState({...songsState, data: res.data, loading:false})
            else
                setSongsState({...songsState, error: {
                    error: true,
                    message: res.message
                }, loading: false})
        }).catch(() => {
            setSongsState({...songsState, error: {
                error: true,
                message: "Fallo inesperado"
            }, loading: false})
        })
    }

    function fetchSongsToAdd(props?:FetchProps){
        getPlaylistSongsToAdd(playlistId, props).then(res => {
            if(res.success)
                setSongsToAddState({...songsToAddState, data: res.data, loading:false})
            else
                setSongsToAddState({...songsToAddState, error: {
                    error: true,
                    message: res.message
                }, loading: false})
        }).catch(()=> {
            setSongsToAddState({...songsToAddState, error: {
                error:true,
                message: "Fallo inesperado"
            }})
        })
    }

    return {
        playlistSongs: songsState,
        playlistSongsToAdd: songsToAddState,
        fetchSongs: fetch,
        fetchSongsToAdd: fetchSongsToAdd
    }
}
