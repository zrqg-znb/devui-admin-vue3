<template>
  <div class="permissions-page">
    <div class="page-header">
      <h1 class="page-title">权限管理</h1>
      <p class="page-description">管理系统中的各种权限和访问控制</p>
    </div>
    
    <div class="page-content">
      <d-card class="content-card">
        <template #header>
          <div class="card-header">
            <span class="card-title">权限列表</span>
            <d-button type="primary" @click="handleAddPermission">
              <i class="icon-add"></i>
              添加权限
            </d-button>
          </div>
        </template>
        
        <div class="permissions-tree">
          <div 
            v-for="category in permissionCategories" 
            :key="category.id" 
            class="permission-category"
          >
            <div class="category-header" @click="toggleCategory(category.id)">
              <i :class="category.expanded ? 'icon-expand' : 'icon-collapse'"></i>
              <span class="category-name">{{ category.name }}</span>
              <span class="permission-count">{{ category.permissions.length }} 项权限</span>
            </div>
            
            <transition name="category-content">
              <div v-show="category.expanded" class="category-content">
                <div 
                  v-for="permission in category.permissions" 
                  :key="permission.id" 
                  class="permission-item"
                >
                  <div class="permission-info">
                    <div class="permission-icon">
                      <i :class="permission.icon"></i>
                    </div>
                    <div class="permission-details">
                      <h4 class="permission-name">{{ permission.name }}</h4>
                      <p class="permission-description">{{ permission.description }}</p>
                      <span class="permission-code">{{ permission.code }}</span>
                    </div>
                  </div>
                  <div class="permission-actions">
                    <d-switch 
                      v-model="permission.enabled" 
                      @change="handlePermissionToggle(permission)"
                    />
                    <d-button size="sm" @click="handleEditPermission(permission)">编辑</d-button>
                    <d-button size="sm" type="danger" @click="handleDeletePermission(permission)">删除</d-button>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </d-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAppStore } from '../../stores/app'

interface Permission {
  id: string
  name: string
  description: string
  code: string
  icon: string
  enabled: boolean
}

interface PermissionCategory {
  id: string
  name: string
  expanded: boolean
  permissions: Permission[]
}

const appStore = useAppStore()

const permissionCategories = ref<PermissionCategory[]>([
  {
    id: 'user',
    name: '用户管理',
    expanded: true,
    permissions: [
      {
        id: 'user-view',
        name: '查看用户',
        description: '允许查看用户列表和详细信息',
        code: 'user.view',
        icon: 'icon-view',
        enabled: true
      },
      {
        id: 'user-create',
        name: '创建用户',
        description: '允许创建新的用户账户',
        code: 'user.create',
        icon: 'icon-create',
        enabled: true
      },
      {
        id: 'user-edit',
        name: '编辑用户',
        description: '允许修改用户信息',
        code: 'user.edit',
        icon: 'icon-edit',
        enabled: true
      },
      {
        id: 'user-delete',
        name: '删除用户',
        description: '允许删除用户账户',
        code: 'user.delete',
        icon: 'icon-delete',
        enabled: false
      }
    ]
  },
  {
    id: 'content',
    name: '内容管理',
    expanded: false,
    permissions: [
      {
        id: 'content-view',
        name: '查看内容',
        description: '允许查看所有内容',
        code: 'content.view',
        icon: 'icon-view',
        enabled: true
      },
      {
        id: 'content-create',
        name: '创建内容',
        description: '允许创建新内容',
        code: 'content.create',
        icon: 'icon-create',
        enabled: true
      },
      {
        id: 'content-publish',
        name: '发布内容',
        description: '允许发布和撤销内容',
        code: 'content.publish',
        icon: 'icon-publish',
        enabled: true
      }
    ]
  },
  {
    id: 'system',
    name: '系统管理',
    expanded: false,
    permissions: [
      {
        id: 'system-config',
        name: '系统配置',
        description: '允许修改系统配置',
        code: 'system.config',
        icon: 'icon-config',
        enabled: true
      },
      {
        id: 'system-logs',
        name: '查看日志',
        description: '允许查看系统日志',
        code: 'system.logs',
        icon: 'icon-logs',
        enabled: true
      }
    ]
  }
])

const toggleCategory = (categoryId: string) => {
  const category = permissionCategories.value.find(c => c.id === categoryId)
  if (category) {
    category.expanded = !category.expanded
  }
}

const handleAddPermission = () => {
  console.log('添加权限')
}

const handleEditPermission = (permission: Permission) => {
  console.log('编辑权限:', permission)
}

const handleDeletePermission = (permission: Permission) => {
  console.log('删除权限:', permission)
}

const handlePermissionToggle = (permission: Permission) => {
  console.log('切换权限状态:', permission)
}

onMounted(() => {
  appStore.setBreadcrumbs([
    { title: '首页', path: '/' },
    { title: '用户管理', path: '/user' },
    { title: '高级管理', path: '/user/advanced' },
    { title: '权限管理', path: '/user/permissions' }
  ])
})
</script>

<style scoped>
.permissions-page {
  padding: 24px;
  background: #f5f7fa;
  min-height: 100%;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.page-description {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

.content-card {
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.permissions-tree {
  padding: 20px 0;
}

.permission-category {
  margin-bottom: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.category-header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: #f9fafb;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.category-header:hover {
  background: #f3f4f6;
}

.category-header i {
  margin-right: 12px;
  font-size: 16px;
  color: #6b7280;
  transition: transform 0.3s ease;
}

.category-name {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  flex: 1;
}

.permission-count {
  font-size: 12px;
  color: #9ca3af;
  background: #e5e7eb;
  padding: 4px 8px;
  border-radius: 12px;
}

.category-content {
  background: white;
}

.category-content-enter-active,
.category-content-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.category-content-enter-from,
.category-content-leave-to {
  max-height: 0;
  opacity: 0;
}

.category-content-enter-to,
.category-content-leave-from {
  max-height: 1000px;
  opacity: 1;
}

.permission-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.3s ease;
}

.permission-item:hover {
  background: #f9fafb;
}

.permission-item:last-child {
  border-bottom: none;
}

.permission-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.permission-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.permission-icon i {
  font-size: 18px;
  color: white;
}

.permission-details {
  flex: 1;
}

.permission-name {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.permission-description {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.permission-code {
  font-size: 12px;
  color: #9ca3af;
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', monospace;
}

.permission-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-add::before { content: '➕'; }
.icon-expand::before { content: '🔽'; }
.icon-collapse::before { content: '▶️'; }
.icon-view::before { content: '👁️'; }
.icon-create::before { content: '➕'; }
.icon-edit::before { content: '✏️'; }
.icon-delete::before { content: '🗑️'; }
.icon-publish::before { content: '📢'; }
.icon-config::before { content: '⚙️'; }
.icon-logs::before { content: '📊'; }
</style>