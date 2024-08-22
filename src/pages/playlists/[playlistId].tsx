import GenericLayout from '@/components/GenericLayout/GenericLayout'
import { TextInput } from '@/components/TextInput/TextInput'
import usePlaylists from '@/hooks/fetchers/usePlaylists'
import useSongs from '@/hooks/fetchers/useSongs'
import useNotification from '@/hooks/useNotification'
import { addSong, deleteSong } from '@/services/playlist'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useRouter } from 'next/router'
import style from './playlistView.module.scss' 
import React, { useEffect, useState } from 'react'
import useSearcher from '@/hooks/useSearcher'
import usePlaylistSongs from '@/hooks/fetchers/usePlaylistSongs'
import Spinner from '@/components/Spinner/Spinner'
import Paginator from '@/components/Paginator/Paginator'
import { Song } from '@/types/song'
import { FetchProps } from '@/types/fetcher'

export default function PlaylistView() {
    const router = useRouter()
    const {data: playlist, loading} = usePlaylists(Number(router.query.playlistId))
    const [searchSong, setSearchSong] = useState("");
    const [showSearcher, setShowSearcher] = useState(false)
    const {notifySuccess, notifyError} = useNotification();
    const pageSize=25
    const {playlistSongs, fetchSongs: fetchSongs_, playlistSongsToAdd, fetchSongsToAdd} = usePlaylistSongs(Number(router.query.playlistId),{limit:pageSize})
    
    useSearcher({fetch: fetchSongsToAdd, filterValue: searchSong})

    function fetchSongs(props?:FetchProps){
        fetchSongs_({
            ...props,
            limit:pageSize
        })
    }

    if(loading) return <Spinner/>

    if(playlist instanceof Array || !(playlistSongs.data instanceof Array) || !(playlistSongsToAdd.data instanceof Array)) return <></>

    return <GenericLayout title={playlist?.name} >
        <div className='flex flex-col'>
            <p className='my-2'>{playlist?.description}</p>
            <div className='flex gap-4'>
                <Paginator className='w-full' searchPlaceholder='Buscar en playlist' pageSize={pageSize} useFetcher={()=>{
                    return { data: playlistSongs.data, error: playlistSongs.error, loading: playlistSongs.loading, refetch: fetchSongs}
                }}  bodyCell={(s:Song) => <div key={s.songId} className={`bg-blue-800 max-w-[250px] min-w-[250px] p-3 rounded relative flex ${style.songCard}`} >
                        <div className='flex flex-col'>
                            <p className='font-bold text-2xl'>{s.title}</p>
                            <p className='text-slate-200 text-sm'>{s.artists.map(a => a.name).join(' | ')}</p>
                        </div>
                        <div className={`transition-all ${style.deleteButtonContainer} opacity-0 bg-red-700 absolute h-full right-0 top-0 items-center flex rounded-r px-2 shadow-slate-900 shadow-lg`}>
                            <Icon icon={'mdi:trash'} className='w-10 h-10 p-1 rounded-full transition-all hover:text-red-300 hover:bg-red-50/10 cursor-pointer' onClick={()=>{
                                (playlist?.playlistId && playlist.playlistId > 0 && s.songId) && 
                                deleteSong(playlist.playlistId, s.songId).then(res =>{
                                    if(res.success){
                                        notifySuccess("Eliminada correctamente")
                                        fetchSongs()                              
                                        fetchSongsToAdd({
                                            filter:searchSong,
                                            limit:15
                                        })
                                    } else {
                                        notifyError(res.message)
                                    }
                                })
                            }} />
                        </div>
                    </div>} />
                <div className='flex flex-col'>
                    <div className='flex items-center gap-1'>
                        <Icon icon={!showSearcher ? 'mdi:plus':'mdi:chevron-right'} className='w-7 h-7 p-1 rounded-full transition-all hover:text-blue-300 hover:bg-blue-50/10 cursor-pointer' onClick={()=>{
                            setShowSearcher(!showSearcher)
                        }} />
                        <TextInput value={searchSong} onChange={e => setSearchSong(e.target.value)} placeholder='Buscar' className={"transition-all duration-300 " + (showSearcher ? "opacity-100 scale-100 w-56":"opacity-0 scale-95 w-0")} />
                    </div>
                    <div className={"flex flex-col mt-2 overflow-y-auto gap-2 transition-all duration-300 " + (showSearcher ? "opacity-100 scale-100 w-80":"opacity-0 scale-95 w-0")} style={{maxHeight:650}} >
                        {playlistSongsToAdd.data.map(s => <div key={s.songId} className='flex justify-between bg-slate-900 rounded p-2'>
                            <div className='flex flex-col w-4/5'>
                                <p className='font-semibold'>{s.title}</p>
                                <p className='text-xs'>{s.artists.map(a => a.name).join(' | ')}</p>
                            </div>
                            <Icon icon="mdi:plus" className='w-7 h-7 p-1 rounded-full transition-all hover:text-blue-300 hover:bg-blue-50/10 cursor-pointer' onClick={()=> {
                                (playlist?.playlistId && playlist.playlistId > 0 && s.songId) && 
                                addSong(playlist?.playlistId, s.songId).then(res =>{
                                    if(res.success){
                                        notifySuccess('Agregada correctamente')
                                        fetchSongs()                                    
                                        fetchSongsToAdd({
                                            filter:searchSong,
                                            limit:15
                                        })
                                    } else {
                                        notifyError(res.message)
                                    }
                                })} } />
                        </div> )}
                    </div>
                </div>
                
            </div>
            
        </div>
    </GenericLayout>
}
