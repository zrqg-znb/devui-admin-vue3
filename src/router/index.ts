import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/Layout/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/design',
      children: [
        {
          path: 'design',
          name: 'Design',
          component: () => import('../views/Design.vue'),
          meta: { title: '设计', breadcrumb: ['首页', '设计'] }
        },
        {
          path: 'language',
          name: 'Language',
          component: () => import('../views/Language.vue'),
          meta: { title: '语言', breadcrumb: ['首页', '语言'] }
        },
        {
          path: 'components',
          name: 'Components',
          component: () => import('../views/Components.vue'),
          meta: { title: '组件', breadcrumb: ['首页', '组件'] }
        },
        {
          path: 'life',
          name: 'Life',
          component: () => import('../views/Life.vue'),
          meta: { title: '生活', breadcrumb: ['首页', '生活'] }
        },
        {
          path: 'document',
          name: 'Document',
          component: () => import('../views/Document.vue'),
          meta: { title: '文档', breadcrumb: ['首页', '文档'] }
        },
        {
          path: 'admin',
          name: 'Admin',
          redirect: '/admin/devui-admin',
          meta: { title: 'Admin区块', breadcrumb: ['首页', 'Admin区块'] },
          children: [
            {
              path: 'devui-admin',
              name: 'DevUIAdmin',
              component: () => import('../views/admin/DevUIAdmin.vue'),
              meta: { title: 'DevUI Admin', breadcrumb: ['首页', 'Admin区块', 'DevUI Admin'] }
            },
            {
              path: 'devui-icons',
              name: 'DevUIIcons',
              component: () => import('../views/admin/DevUIIcons.vue'),
              meta: { title: 'DevUI 图标库', breadcrumb: ['首页', 'Admin区块', 'DevUI 图标库'] }
            }
          ]
        }
      ]
    },
  ]
})

export default router