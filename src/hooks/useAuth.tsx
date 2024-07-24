import { authenticate } from '@/services/auth'
import React from 'react'

export default function useAuth() {
    return {authenticate}
}
