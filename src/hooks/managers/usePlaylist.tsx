import { useState } from 'react';
import { ControllerInterface, ControllerProps, TResult } from '@/types/controller';
import { Playlist } from '@/types/playlist';
import { deletePlaylist, savePlaylist, updatePlaylist } from '@/services/playlist';
import useRequestWrapper from '../useRequestWrapper';

export default function usePlaylist({ onSave, onUpdate, onDelete }: ControllerProps): ControllerInterface {
    const [saveResult, setSaveResult] = useState<TResult>({});
    const [updateResult, setUpdateResult] = useState<TResult>({});
    const [deleteResult, setDeleteResult] = useState<TResult>({});
    const { request } = useRequestWrapper();

    function saveEntity(p: Playlist) {
        request(() => savePlaylist(p), saveResult, setSaveResult, onSave);
    }

    function deleteEntity(p: Playlist) {
        request(() => deletePlaylist(p.playlistId!), deleteResult, setDeleteResult, onDelete);
    }

    function updateEntity(p: Playlist, id: number) {
        request(() => updatePlaylist({ ...p, playlistId: id }), updateResult, setUpdateResult, onUpdate);
    }

    return {
        save: {
            saveEntity,
            result: saveResult
        },
        update: {
            updateEntity,
            result: updateResult
        },
        delete: {
            deleteEntity,
            result: deleteResult
        }
    };
}
