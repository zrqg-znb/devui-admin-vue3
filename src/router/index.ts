import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/Layout/Layout.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Layout,
            redirect: '/dashboard',
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: () => import('../views/Dashboard.vue'),
                    meta: { title: '仪表盘', icon: 'home' }
                },
                {
                    path: 'user',
                    name: 'User',
                    redirect: '/user/list',
                    meta: { title: '用户管理', icon: 'user' },
                    children: [
                        {
                            path: 'list',
                            name: 'UserList',
                            component: () => import('../views/User/UserList.vue'),
                            meta: { title: '用户列表', icon: 'list' }
                        },
                        {
                            path: 'detail',
                            name: 'UserDetail',
                            component: () => import('../views/User/UserDetail.vue'),
                            meta: { title: '用户详情', icon: 'detail' }
                        }
                    ]
                },
                {
                    path: 'system',
                    name: 'System',
                    redirect: '/system/settings',
                    meta: { title: '系统管理', icon: 'setting' },
                    children: [
                        {
                            path: 'settings',
                            name: 'SystemSettings',
                            meta: { title: '系统设置', icon: 'config' },
                            children: [
                                {
                                    path: 'basic',
                                    name: 'BasicSettings',
                                    component: () => import('../views/System/Settings.vue'),
                                    meta: { title: '基础设置', icon: 'setting' }
                                },
                                {
                                    path: 'security',
                                    name: 'SecuritySettings',
                                    component: () => import('../views/System/Settings.vue'),
                                    meta: { title: '安全设置', icon: 'shield' }
                                }
                            ]
                        },
                        {
                            path: 'logs',
                            name: 'SystemLogs',
                            component: () => import('../views/System/Settings.vue'),
                            meta: { title: '系统日志', icon: 'log' }
                        }
                    ]
                }
            ]
        }
    ]
})

export default router