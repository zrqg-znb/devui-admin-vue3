<template>
  <d-header class="admin-header">
    <div class="header-left">
      <d-button
          variant="text"
          @click="appStore.toggleSidebar()"
          class="menu-toggle"
      >
        <d-icon :name="appStore.collapsed ? 'menu-unfold' : 'menu-fold'" />
      </d-button>

      <d-breadcrumb class="breadcrumb">
        <d-breadcrumb-item
            v-for="item in appStore.breadcrumbs"
            :key="item.title"
            :to="item.path"
        >
          {{ item.title }}
        </d-breadcrumb-item>
      </d-breadcrumb>
    </div>

    <div class="header-right">
      <d-dropdown>
        <template #default>
          <div class="user-info">
            <d-avatar :src="userStore.user?.avatar" size="sm" />
            <span class="username">{{ userStore.user?.username }}</span>
            <d-icon name="chevron-down" />
          </div>
        </template>
        <template #menu>
          <d-dropdown-menu>
            <d-dropdown-item>个人设置</d-dropdown-item>
            <d-dropdown-item>
              <d-dropdown placement="left-start">
                <template #default>
                  <div class="theme-trigger">
                    <d-icon name="palette" />
                    <span>主题设置</span>
                    <d-icon name="chevron-right" class="arrow-icon" />
                  </div>
                </template>
                <template #menu>
                  <d-dropdown-menu class="theme-menu">
                    <d-dropdown-item 
                      v-for="theme in themes" 
                      :key="theme.id"
                      @click="switchTheme(theme.id)"
                      :class="{ 'active-theme': currentTheme === theme.id }"
                    >
                      <div class="theme-item">
                        <div class="theme-color" :style="{ backgroundColor: theme.color }"></div>
                        <span>{{ theme.name }}</span>
                        <d-icon v-if="currentTheme === theme.id" name="check" class="check-icon" />
                      </div>
                    </d-dropdown-item>
                  </d-dropdown-menu>
                </template>
              </d-dropdown>
            </d-dropdown-item>
            <d-dropdown-item divided @click="handleLogout">退出登录</d-dropdown-item>
          </d-dropdown-menu>
        </template>
      </d-dropdown>
    </div>
  </d-header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../stores/user'
import { useAppStore } from '../../stores/app'

const userStore = useUserStore()
const appStore = useAppStore()

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
const switchTheme = (themeId: string) => {
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
      }
    })
  }
}

// 初始化当前主题
onMounted(() => {
  const savedTheme = localStorage.getItem('devui-theme')
  if (savedTheme) {
    currentTheme.value = savedTheme
  }
})

const handleLogout = () => {
  userStore.logout()
}
</script>

<style scoped>
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  height: 64px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
  z-index: 10;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.menu-toggle {
  font-size: 18px;
  color: #5e7ce0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.3s;
}

.menu-toggle:hover {
  background-color: rgba(94, 124, 224, 0.1);
}

.breadcrumb {
  margin-left: 8px;
}

:deep(.devui-breadcrumb-item) {
  color: #666;
}

:deep(.devui-breadcrumb-item.active) {
  color: #5e7ce0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s;
  border: 1px solid transparent;
}

.user-info:hover {
  background-color: rgba(94, 124, 224, 0.1);
  border-color: rgba(94, 124, 224, 0.2);
}

.username {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

:deep(.devui-dropdown-menu) {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 21, 41, 0.08);
}

:deep(.devui-dropdown-item) {
  transition: all 0.3s;
}

:deep(.devui-dropdown-item:hover) {
  background-color: rgba(94, 124, 224, 0.1);
  color: #5e7ce0;
}

/* 主题设置样式 */
.theme-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  justify-content: space-between;
}

.arrow-icon {
  font-size: 12px;
  color: #999;
}

.theme-menu {
  min-width: 180px;
}

.theme-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.theme-color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

.check-icon {
  margin-left: auto;
  color: #5e7ce0;
  font-size: 14px;
}

.active-theme {
  background-color: rgba(94, 124, 224, 0.1) !important;
  color: #5e7ce0 !important;
}

:deep(.theme-menu .devui-dropdown-item) {
  padding: 8px 12px;
}

:deep(.theme-menu .devui-dropdown-item:hover) {
  background-color: rgba(94, 124, 224, 0.08);
}
</style>