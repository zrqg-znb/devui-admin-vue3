<template>
  <d-layout>
    <Sidebar />
    <d-layout class="admin-layout">
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
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import { useAppStore } from '../../stores/app'

const appStore = useAppStore()
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  margin-left: 80px;
  background-color: #f5f7fa;
}

.admin-main {
  flex: 1;
  padding: 0;
  overflow-x: hidden;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.content-wrapper {
  padding: 24px;
  height: 100%;
  min-height: 100vh;
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