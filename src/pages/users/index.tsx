import GenericCRUDTable from '@/components/GenericCRUDTable/GenericCRUDTable'
import GenericLayout from '@/components/GenericLayout/GenericLayout'
import useUsers from '@/hooks/fetchers/useUsers'
import useUser from '@/hooks/managers/useUser'
import useLoggedUser from '@/hooks/useLoggedUser'
import { User } from '@/types/user'
import React from 'react'

export default function Users() {

    const user = useLoggedUser()

    return <GenericLayout title='Usuarios'>
        <div className='w-full py-4'>
        <GenericCRUDTable useFetcher={useUsers} columns={[{
            accessorKey: "username",
            header: "Nombre de usuario",
        },{
            accessorKey: "email",
            header: "Email"
        },{
            accessorKey: "profile",
            header: "Perfil",
            body: (row:User) => {
                return row.profile?.name
            }
        }]} useManager={useUser} entityIdField='userId'
        
            deleteWhen={row => user?.userId !== row.userId}
        />
        </div>
    </GenericLayout>
}
