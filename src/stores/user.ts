import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '../types'

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>({
        id: 1,
        username: 'Admin',
        email: 'admin@example.com',
        role: 'administrator',
        avatar: 'https://via.placeholder.com/40'
    })

    const isLoggedIn = ref(true)

    const login = async (username: string, password: string) => {
        // 模拟登录逻辑
        console.log('Login:', username, password)
        isLoggedIn.value = true
    }

    const logout = () => {
        user.value = null
        isLoggedIn.value = false
    }

    return {
        user,
        isLoggedIn,
        login,
        logout
    }
})