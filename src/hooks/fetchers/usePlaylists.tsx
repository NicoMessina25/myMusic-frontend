// src/hooks/fetchers/usePlaylists.ts

import { getPlaylistById, getPlaylists } from '@/services/playlist';
import { FetcherResult } from '@/types/fetcher';
import { Playlist } from '@/types/playlist';
import { useEffect, useState } from 'react';

export default function usePlaylists(entityId?: number): FetcherResult<Playlist> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [data, setData] = useState<Playlist | Playlist[]>([]);

    useEffect(() => {
        fetch();
    }, []);

    function fetch() {
        setLoading(true);
        (entityId ? getPlaylistById(entityId) : getPlaylists()).then(res => {
            if (res.success) {
                setData(res.data);
            } else {
                setError(true);
                setErrorMessage(res.message);
            }
        }).catch(() => {
            setError(true);
            setErrorMessage("Fallo inesperado");
        }).finally(() => setLoading(false));
    }

    return { data, loading, error: { error, message: errorMessage }, refetch: fetch };
}
