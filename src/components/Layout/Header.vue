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
            <d-dropdown-item divided @click="handleLogout">退出登录</d-dropdown-item>
          </d-dropdown-menu>
        </template>
      </d-dropdown>
    </div>
  </d-header>
</template>

<script setup lang="ts">
import { useUserStore } from '../../stores/user'
import { useAppStore } from '../../stores/app'

const userStore = useUserStore()
const appStore = useAppStore()

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
</style>