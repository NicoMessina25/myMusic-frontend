import { User } from '@/types/user'
import React, { useEffect, useState } from 'react'

export default function useLoggedUser():User|null {
    const [user, setUser] = useState<User|null>(null)

    useEffect(() => {
        const stringUser = localStorage.getItem("myMusicUser")
        stringUser && setUser(JSON.parse(stringUser))
    },[])

    return user
}
