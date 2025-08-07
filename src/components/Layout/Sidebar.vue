<template>
  <d-aside
      :class="['admin-sidebar', { collapsed: appStore.collapsed }]"
      :width="appStore.collapsed ? '80px' : '240px'"
  >
    <div class="logo">
      <img src="../../assets/vue.svg" alt="Logo" :key="appStore.collapsed ? 'collapsed' : 'expanded'" />
      <span v-show="!appStore.collapsed" class="logo-text">Admin System</span>
    </div>

    <d-menu
        :collapsed="appStore.collapsed"
        :default-select-keys="[currentRoute]"
        @select="handleMenuSelect"
    >
      <template v-for="item in appStore.menuItems" :key="item.id">
        <d-menu-item
            v-if="!item.children"
            :key="item.id"
            :value="item.path"
        >
          <template #icon>
            <d-icon :name="item.icon" />
          </template>
          {{ item.title }}
        </d-menu-item>

        <d-submenu
            v-else
            :key="`submenu-${item.id}`"
            :title="item.title"
        >
          <template #icon>
            <d-icon :name="item.icon" />
          </template>
          <template v-for="child in item.children" :key="child.id">
            <d-menu-item
                v-if="!child.children"
                :value="child.path"
            >
              <template #icon>
                <d-icon :name="child.icon" />
              </template>
              {{ child.title }}
            </d-menu-item>

            <d-submenu
                v-else
                :key="`submenu-${child.id}`"
                :title="child.title"
            >
              <template #icon>
                <d-icon :name="child.icon" />
              </template>
              <d-menu-item
                  v-for="grandChild in child.children"
                  :key="grandChild.id"
                  :value="grandChild.path"
              >
                <template #icon>
                  <d-icon :name="grandChild.icon" />
                </template>
                {{ grandChild.title }}
              </d-menu-item>
            </d-submenu>
          </template>
        </d-submenu>
      </template>
    </d-menu>
  </d-aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '../../stores/app'

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()

const currentRoute = computed(() => route.path)

const handleMenuSelect = (value: string) => {
  router.push(value)
}
</script>

<style scoped>
.admin-sidebar {
  background: #fff;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}

.logo {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  height: 64px;
  background: linear-gradient(to right, #5e7ce0, #4c6fe3);
}

.logo img {
  width: 32px;
  height: 32px;
  filter: brightness(0) invert(1);
  transition: all 0.3s;
}

.logo-text {
  margin-left: 12px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  opacity: 1;
  transition: opacity 0.3s;
}

.collapsed .logo {
  justify-content: center;
  padding: 16px;
}

.collapsed .logo-text {
  opacity: 0;
  width: 0;
}

:deep(.devui-menu) {
  border: none;
  padding: 8px;
}

:deep(.devui-menu-item) {
  margin: 4px 8px;
  border-radius: 6px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}

:deep(.devui-menu-item:hover) {
  background-color: rgba(94, 124, 224, 0.1);
  color: #5e7ce0;
}

:deep(.devui-menu-item.active) {
  background-color: #5e7ce0 !important;
  color: #fff !important;
  box-shadow: 0 2px 8px rgba(94, 124, 224, 0.35);
}

:deep(.devui-submenu) {
  margin: 4px 0;
}

:deep(.devui-submenu-title) {
  margin: 4px 8px;
  border-radius: 6px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}

:deep(.devui-submenu-title:hover) {
  background-color: rgba(94, 124, 224, 0.1);
  color: #5e7ce0;
}

:deep(.devui-submenu .devui-menu-item) {
  padding-left: 48px !important;
}

:deep(.devui-submenu .devui-submenu .devui-menu-item) {
  padding-left: 64px !important;
}

:deep(.devui-icon) {
  font-size: 16px;
  margin-right: 8px;
  transition: all 0.3s;
}

:deep(.devui-menu-item.active .devui-icon) {
  color: #fff;
}

.collapsed :deep(.devui-menu-item),
.collapsed :deep(.devui-submenu-title) {
  padding: 0 !important;
  justify-content: center;
}

.collapsed :deep(.devui-icon) {
  margin-right: 0;
  font-size: 18px;
}
</style>