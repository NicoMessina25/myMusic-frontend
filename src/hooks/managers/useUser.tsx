import { useState } from 'react'
import { ControllerInterface, ControllerProps, TResult } from '@/types/controller';
import { User } from '@/types/user';
import { deleteUser, saveUser, updateUser } from '@/services/users';
import useRequestWrapper from '../useRequestWrapper';

export default function useUser({onSave, onUpdate, onDelete}:ControllerProps): ControllerInterface {
    const [saveResult, setSaveResult] = useState<TResult>({})
    const [updateResult, setUpdateResult] = useState<TResult>({})
    const [deleteResult, setDeleteResult] = useState<TResult>({})
    const {request} = useRequestWrapper()


    function saveEntity(s:User){
        request(() => saveUser(s), saveResult, setSaveResult, onSave)
    }

    function deleteEntity(s:User){
        request(() => deleteUser(s.userId!), deleteResult, setDeleteResult, onDelete) //userId no va a ser null o undefined
    }

    function updateEntity(s:User, id:number){
        request(() => updateUser({...s, userId: id}), updateResult, setUpdateResult, onUpdate)
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
