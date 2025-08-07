import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MenuItem } from '../types'

export const useAppStore = defineStore('app', () => {
    const collapsed = ref(false)
    const theme = ref<'light' | 'dark'>('light')
    const breadcrumbs = ref<Array<{ title: string; path: string }>>([{ title: '首页', path: '/' }])

    const menuItems = ref<MenuItem[]>([
        {
            id: 'dashboard',
            title: '仪表盘',
            icon: 'home',
            path: '/dashboard'
        },
        {
            id: 'user',
            title: '用户管理',
            icon: 'user',
            children: [
                { id: 'user-list', title: '用户列表', path: '/user/list', icon: 'list' },
                { id: 'user-detail', title: '用户详情', path: '/user/detail', icon: 'detail' }
            ]
        },
        {
            id: 'system',
            title: '系统管理',
            icon: 'setting',
            children: [
                {
                    id: 'system-settings',
                    title: '系统设置',
                    icon: 'config',
                    children: [
                        { id: 'basic-settings', title: '基础设置', path: '/system/settings/basic', icon: 'setting' },
                        { id: 'security-settings', title: '安全设置', path: '/system/settings/security', icon: 'shield' }
                    ]
                },
                { id: 'system-logs', title: '系统日志', path: '/system/logs', icon: 'log' }
            ]
        }
    ])

    const toggleSidebar = () => {
        collapsed.value = !collapsed.value
    }

    const setBreadcrumbs = (crumbs: Array<{ title: string; path: string }>) => {
        breadcrumbs.value = crumbs.map(crumb => ({
            title: crumb.title,
            path: crumb.path || '/'
        }))
    }

    return {
        collapsed,
        theme,
        breadcrumbs,
        menuItems,
        toggleSidebar,
        setBreadcrumbs
    }
})