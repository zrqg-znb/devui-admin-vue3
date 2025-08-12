<template>
  <div class="admin-sidebar">
    <!-- Logo 区域 -->
    <div class="logo-container">
      <div class="logo-wrapper">
        <img 
           src="/src/assets/vue.svg" 
           alt="DevUI Admin" 
           class="logo-image"
         />
        <span class="logo-text">DevUI<br>Admin</span>
      </div>
    </div>
    
    <!-- 菜单区域 -->
    <div class="menu-container">
      <div class="custom-menu">
        <template v-for="item in appStore.menuItems" :key="item.id">
          <!-- 有子菜单的项 -->
          <div v-if="item.children" class="menu-group">
            <div 
              class="menu-item parent-item"
              :class="{ 'is-active': isParentActive(item) }"
              @click="handleMenuItemClick(item)"
            >
              <div class="menu-content">
                <i :class="getIconClass(item.icon || '')"></i>
                <span class="menu-title">{{ item.title }}</span>
              </div>
            </div>
            
            <!-- 子菜单 -->
            <div 
              v-show="expandedMenus.includes(item.id)" 
              class="submenu-container"
            >
              <template v-for="child in item.children" :key="child.id">
                <!-- 二级菜单项 -->
                <div 
                  class="menu-item submenu-item"
                  :class="{ 'is-active': currentPath === child.path }"
                  @click="child.path && handleMenuClick(child.path)"
                >
                  <div class="menu-content">
                    <i :class="getIconClass(child.icon || '')"></i>
                    <span class="menu-title">{{ child.title }}</span>
                  </div>
                </div>
              </template>
            </div>
          </div>
          
          <!-- 无子菜单的项 -->
          <div 
            v-else
            class="menu-item"
            :class="{ 'is-active': currentPath === item.path }"
            @click="handleMenuItemClick(item)"
          >
            <div class="menu-content">
              <i :class="getIconClass(item.icon || '')"></i>
              <span class="menu-title">{{ item.title }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  
    <!-- 底部用户信息和主题切换 -->
    <div class="sidebar-footer">
      <!-- 主题切换组件 -->
      <div class="theme-switcher">
        <div class="theme-toggle" @click="toggleTheme">
          <i class="icon-palette"></i>
          <span v-show="!appStore.collapsed">主题设置</span>
        </div>
        
        <!-- 主题选择面板 -->
<div class="theme-panel" v-show="isThemePanelVisible" :style="{ left: appStore.collapsed ? '64px' : '16px', width: appStore.collapsed ? '200px' : '240px' }">
          <div class="theme-panel-header">
            <span>选择主题</span>
            <i class="icon-close" @click="isThemePanelVisible = false"></i>
          </div>
          <div class="theme-list">
            <div 
              v-for="theme in themes" 
              :key="theme.id"
              class="theme-item"
              :class="{ 'active-theme': currentTheme === theme.id }"
              @click="applyTheme(theme.id)"
            >
              <div class="theme-color" :style="{ backgroundColor: theme.color }"></div>
              <span class="theme-name">{{ theme.name }}</span>
              <i v-if="currentTheme === theme.id" class="icon-check"></i>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 用户信息 -->
      <div class="user-info" @click="handleUserAction">
        <d-avatar :src="userStore.user?.avatar" size="sm" />
        <span v-show="!appStore.collapsed" class="username">{{ userStore.user?.username }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '../../stores/app'
import { useUserStore } from '../../stores/user'
import { useRouter, useRoute } from 'vue-router'
import { computed, watch, ref, onMounted } from 'vue'
import type { MenuItem } from '../../types'

const appStore = useAppStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

// 展开的菜单ID列表
const expandedMenus = ref<string[]>([])

// 当前路径
const currentPath = computed(() => route.path)

// 主题相关数据
const currentTheme = ref('infinityTheme')
const themes = ref([
  { id: 'infinityTheme', name: '无限主题', color: '#5e7ce0' },
  { id: 'provenceTheme', name: '紫罗兰主题', color: '#7c4dff' },
  { id: 'sweetTheme', name: '蜜糖主题', color: '#ff6b6b' },
  { id: 'deepTheme', name: '深邃夜空主题', color: '#2c3e50' },
  { id: 'galaxyTheme', name: '追光主题', color: '#667eea' }
])

// 切换主题
const toggleTheme = () => {
  // 显示主题选择面板
  isThemePanelVisible.value = !isThemePanelVisible.value
}

// 主题面板显示状态
const isThemePanelVisible = ref(false)

// 应用主题
const applyTheme = (themeId: string) => {
  const themeService = (window as any).themeService
  if (themeService) {
    // 动态导入主题并应用
    import('devui-theme').then(({ infinityTheme, provenceTheme, sweetTheme, deepTheme, galaxyTheme }) => {
      const themeObjects: any = {
        'infinityTheme': infinityTheme,
        'provenceTheme': provenceTheme,
        'sweetTheme': sweetTheme,
        'deepTheme': deepTheme,
        'galaxyTheme': galaxyTheme
      }
      
      if (themeObjects[themeId]) {
        themeService.applyTheme(themeObjects[themeId])
        currentTheme.value = themeId
        // 保存到本地存储
        localStorage.setItem('devui-theme', themeId)
        // 关闭主题面板
        isThemePanelVisible.value = false
      }
    })
  }
}

// 处理用户操作
const handleUserAction = () => {
  // 这里可以添加用户点击头像后的操作，比如显示用户菜单等
  // 暂时不做任何操作
}

onMounted(() => {
  // 初始化当前主题
  const savedTheme = localStorage.getItem('devui-theme')
  if (savedTheme) {
    currentTheme.value = savedTheme
  }
})

// 切换菜单展开/收起
const toggleMenu = (menuId: string) => {
  const index = expandedMenus.value.indexOf(menuId)
  if (index > -1) {
    expandedMenus.value.splice(index, 1)
  } else {
    // 关闭其他展开的菜单，只保留当前点击的菜单展开
    expandedMenus.value = [menuId]
  }
}

// 处理菜单点击
const handleMenuClick = (path: string) => {
  if (path) {
    router.push(path)
  }
}

// 处理菜单项点击
const handleMenuItemClick = (item: MenuItem) => {
  if (item.children && item.children.length > 0) {
    // 如果有子菜单，则切换展开状态
    if (item.id) toggleMenu(item.id)
  } else if (item.path) {
    // 如果没有子菜单，则直接导航到路径
    router.push(item.path)
  }
}

// 处理菜单选择
const handleMenuSelect = (value: string) => {
  if (value && value !== route.path) {
    router.push(value)
  }
}

// 获取图标类名
 const getIconClass = (icon: string) => {
   const iconMap: Record<string, string> = {
     home: 'icon-home',
     user: 'icon-user',
     setting: 'icon-setting',
     list: 'icon-list',
     detail: 'icon-detail',
     config: 'icon-config',
     advanced: 'icon-advanced',
     role: 'icon-role',
     permission: 'icon-permission',
     content: 'icon-content',
     article: 'icon-article',
     media: 'icon-media',
     image: 'icon-image',
     video: 'icon-video',
     log: 'icon-log'
   }
   return iconMap[icon] || `icon-${icon}`
 }

// 判断父菜单是否激活（支持三级菜单）
 const isParentActive = (item: MenuItem): boolean => {
   if (!item.children) return false
   return item.children.some(child => {
     if (child.path === currentPath.value) return true
     if (child.children) {
       return child.children.some(grandChild => grandChild.path === currentPath.value)
     }
     return false
   })
 }

// 监听路由变化，更新面包屑
watch(route, (newRoute) => {
  if (newRoute.meta?.breadcrumb) {
    const breadcrumbs = (newRoute.meta.breadcrumb as string[]).map((title, index) => ({
      title,
      path: index === 0 ? '/' : newRoute.path
    }))
    appStore.setBreadcrumbs(breadcrumbs)
  }
}, { immediate: true })
</script>

<style scoped>
.admin-sidebar {
  width: 80px;
  background: #f5f7fa;
  color: #333;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e8e8e8;
}

.logo-container {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-bottom: 1px solid #e8e8e8;
  background: white;
}

.logo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.logo-image {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}

.logo-text {
  font-size: 12px;
  font-weight: 500;
  color: #252b3a;
}

.menu-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  height: calc(100vh - 64px - 100px); /* 减去logo高度和底部高度 */
}

.menu-container::-webkit-scrollbar {
  width: 4px;
}

.menu-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.menu-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

/* 自定义菜单样式 */
.custom-menu {
  padding: 0;
}

/* 菜单项基础样式 */
.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  cursor: pointer;
  color: #575d6c;
  font-size: 12px;
  position: relative;
  text-align: center;
}

.menu-item:hover {
  background: #eef0f5;
  color: #5e7ce0;
}

.menu-item.is-active {
  color: #5e7ce0;
  position: relative;
}

.menu-item.is-active::after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 16px;
  background-color: #5e7ce0;
  border-radius: 0 2px 2px 0;
}

/* 菜单内容区域 */
.menu-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* 展开图标 */
.expand-icon {
  display: none;
}

/* 父级菜单项 */
.parent-item {
  font-weight: 500;
}

.parent-item.is-expanded {
  background: #eef0f5;
  color: #5e7ce0;
}

/* 子菜单容器 */
.submenu-container {
  position: fixed;
  left: 80px;
  top: 0;
  width: 200px;
  height: 100vh;
  background: white;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
  padding: 16px 0;
}

/* 子菜单项样式 */
.submenu-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 20px;
  font-size: 14px;
  color: #252b3a;
  border-left: 3px solid transparent;
}

.submenu-item:hover {
  background: #f2f5fc;
  color: #5e7ce0;
}

.submenu-item.is-active {
  background: #f2f5fc;
  color: #5e7ce0;
  border-left: 3px solid #5e7ce0;
}

.menu-title {
  font-size: 12px;
  font-weight: normal;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.menu-content i {
  font-size: 20px;
  margin-bottom: 4px;
}

.submenu-item .menu-title {
  font-size: 14px;
  margin-top: 0;
  margin-left: 8px;
}

.submenu-item .menu-content {
  flex-direction: row;
}

/* 图标样式 */
.icon-design::before { content: '🎨'; }
.icon-language::before { content: '🔤'; }
.icon-components::before { content: '🧩'; }
.icon-life::before { content: '✅'; }
.icon-document::before { content: '📄'; }
.icon-admin::before { content: '📦'; }
.icon-dashboard::before { content: '📊'; }
.icon-icons::before { content: '🔍'; }

/* 侧边栏现在是固定不折叠的 */

/* 主题切换组件 */
.sidebar-footer {
  margin-top: auto;
  background: white;
}

.theme-switcher {
  padding: 12px 16px;
  border-top: 1px solid #e8e8e8;
  position: relative;
  background: white;
}

.theme-toggle {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #575d6c;
  background: #eef0f5;
  border: 1px solid #e1e4e8;
}

.theme-toggle:hover {
  background: #e9edfa;
  color: #5e7ce0;
  border-color: #c2cbe8;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  cursor: pointer;
  border-top: 1px solid #e8e8e8;
}

.user-info:hover {
  background-color: #f5f7fa;
}

.username {
  font-size: 14px;
  color: #252b3a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.theme-toggle i {
  font-size: 18px;
  margin-right: 8px;
}

.admin-sidebar.collapsed .theme-toggle {
  justify-content: center;
  padding: 10px;
}

.admin-sidebar.collapsed .theme-toggle i {
  margin-right: 0;
}

/* 主题面板样式 */
.theme-panel {
  position: fixed;
  bottom: 120px;
  left: 16px;
  width: 240px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1000;
  animation: slideUp 0.3s ease;
}

.collapsed .theme-panel {
  width: 200px;
  left: 64px;
}

@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.theme-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  color: #333;
  font-weight: 500;
}

.theme-panel-header .icon-close {
  cursor: pointer;
  font-size: 14px;
  color: #999;
}

.theme-panel-header .icon-close:hover {
  color: #333;
}

.theme-list {
  padding: 12px;
  max-height: 300px;
  overflow-y: auto;
}

.theme-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 8px;
}

.theme-item:hover {
  background: #f5f7fa;
}

.theme-item.active-theme {
  background: rgba(94, 124, 224, 0.1);
}

.theme-color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 12px;
  border: 2px solid white;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

.theme-name {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.icon-check {
  color: #5e7ce0;
  font-size: 14px;
}

.icon-check::before { content: '✓'; }
.icon-palette::before { content: '🎨'; }
.icon-close::before { content: '×'; }

/* DevUI主题变量 */
:root {
  --sidebar-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --sidebar-text-color: white;
  --sidebar-shadow: 2px 0 12px rgba(0, 0, 0, 0.15);
}

/* 自定义滚动条 */
.theme-list::-webkit-scrollbar {
  width: 4px;
}

.theme-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.theme-list::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 2px;
}

.theme-list::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>