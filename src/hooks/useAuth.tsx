import { authenticate, register } from '@/services/auth'
import React from 'react'

export default function useAuth() {
    return {authenticate, register}
}
