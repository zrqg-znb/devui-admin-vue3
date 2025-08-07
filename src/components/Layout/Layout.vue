<template>
  <d-layout>
    <Sidebar />
    <d-layout :class="['admin-layout', { collapsed: appStore.collapsed }]">
      <Header />
      <d-layout class="main-container">
        <d-main class="admin-main">
          <div class="content-wrapper">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </d-main>
      </d-layout>
    </d-layout>
  </d-layout>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
import { useAppStore } from '../../stores/app'

const appStore = useAppStore()
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  margin-left: 240px;
  transition: margin-left 0.3s;
  background-color: #f5f7fa;
}

:deep(.admin-layout.collapsed) {
  margin-left: 80px;
}

.main-container {
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  position: relative;
}

.admin-main {
  flex: 1;
  padding: 0;
  overflow-x: hidden;
  background-color: #f5f7fa;
}

.content-wrapper {
  padding: 24px;
  height: 100%;
  min-height: calc(100vh - 64px);
}

/* 页面切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>