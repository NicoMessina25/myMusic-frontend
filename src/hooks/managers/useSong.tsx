import { useState } from 'react'
import { ControllerInterface, ControllerProps, TResult } from '@/types/controller';
import { Song } from '@/types/song';
import { deleteSong, saveSong, updateSong } from '@/services/songs';
import useRequestWrapper from '../useRequestWrapper';

export default function useSong({onSave, onUpdate, onDelete}:ControllerProps): ControllerInterface {
    const [saveResult, setSaveResult] = useState<TResult>({})
    const [updateResult, setUpdateResult] = useState<TResult>({})
    const [deleteResult, setDeleteResult] = useState<TResult>({})
    const {request} = useRequestWrapper()


    function saveEntity(s:Song){
        request(() => saveSong(s), saveResult, setSaveResult, onSave)
    }

    function deleteEntity(s:Song){
        request(() => deleteSong(s.songId!), deleteResult, setDeleteResult, onDelete) //songId no va a ser null o undefined
    }

    function updateEntity(s:Song, id:number){
        request(() => updateSong({...s, songId: id}), updateResult, setUpdateResult, onUpdate)
    }


    return {save: {
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
        }
}
