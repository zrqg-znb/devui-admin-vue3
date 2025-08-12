import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MenuItem } from '../types'

export const useAppStore = defineStore('app', () => {
    const collapsed = ref(false)
    const theme = ref<'light' | 'dark'>('light')
    const breadcrumbs = ref<Array<{ title: string; path: string }>>([{ title: '首页', path: '/' }])

    const menuItems = ref<MenuItem[]>([
        {
            id: 'design',
            title: '设计',
            icon: 'design',
            path: '/design'
        },
        {
            id: 'language',
            title: '语言',
            icon: 'language',
            path: '/language'
        },
        {
            id: 'components',
            title: '组件',
            icon: 'components',
            path: '/components'
        },
        {
            id: 'life',
            title: '生活',
            icon: 'life',
            path: '/life'
        },
        {
            id: 'document',
            title: '文档',
            icon: 'document',
            path: '/document'
        },
        {
            id: 'admin',
            title: 'Admin区块',
            icon: 'admin',
            children: [
                { id: 'admin-dashboard', title: 'DevUI Admin', path: '/admin/devui-admin', icon: 'dashboard' },
                { id: 'admin-icons', title: 'DevUI 图标库', path: '/admin/devui-icons', icon: 'icons' }
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