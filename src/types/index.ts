export interface User {
    id: number
    username: string
    email: string
    role: string
    avatar?: string
}

export interface MenuItem {
    id: string
    title: string
    icon?: string
    path?: string
    children?: MenuItem[]
}

export interface AppState {
    collapsed: boolean
    theme: 'light' | 'dark'
    breadcrumbs: Array<{ title: string; path?: string }>
}