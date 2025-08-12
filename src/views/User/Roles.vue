<template>
  <div class="roles-page">
    <div class="page-header">
      <h1 class="page-title">角色管理</h1>
      <p class="page-description">管理系统中的用户角色和权限分配</p>
    </div>
    
    <div class="page-content">
      <d-card class="content-card">
        <template #header>
          <div class="card-header">
            <span class="card-title">角色列表</span>
            <d-button type="primary" @click="handleAddRole">
              <i class="icon-add"></i>
              添加角色
            </d-button>
          </div>
        </template>
        
        <!-- 搜索和筛选 -->
        <div class="search-section">
          <d-row :gutter="16">
            <d-col :span="8">
              <d-input 
                v-model="searchKeyword" 
                placeholder="搜索角色名称或描述"
                prefix-icon="search"
                clearable
              />
            </d-col>
            <d-col :span="6">
              <d-select v-model="statusFilter" placeholder="选择状态">
                <d-option value="all">全部状态</d-option>
                <d-option value="active">启用</d-option>
                <d-option value="inactive">禁用</d-option>
              </d-select>
            </d-col>
            <d-col :span="4">
              <d-button variant="outline" @click="resetFilters">重置</d-button>
            </d-col>
          </d-row>
        </div>

        <!-- 角色表格 -->
        <d-table 
          :data="filteredRoles" 
          :columns="columns"
          stripe
          border
          class="roles-table"
        >
          <template #icon="{ row }">
            <d-avatar size="sm" :style="{ backgroundColor: row.color }">
              <d-icon :name="row.iconName" />
            </d-avatar>
          </template>
          
          <template #permissions="{ row }">
            <d-tag 
              v-for="permission in row.permissions.slice(0, 3)" 
              :key="permission"
              size="sm"
              class="permission-tag"
            >
              {{ permission }}
            </d-tag>
            <d-tag 
              v-if="row.permissions.length > 3"
              size="sm"
              color="info"
            >
              +{{ row.permissions.length - 3 }}
            </d-tag>
          </template>
          
          <template #status="{ row }">
            <d-switch 
              v-model="row.status" 
              @change="handleStatusChange(row)"
              :disabled="row.id === '1'"
            />
          </template>
          
          <template #actions="{ row }">
            <d-button-group size="sm">
              <d-button variant="text" @click="handleViewRole(row)">
                <d-icon name="eye" />
              </d-button>
              <d-button variant="text" @click="handleEditRole(row)">
                <d-icon name="edit" />
              </d-button>
              <d-button 
                variant="text" 
                color="danger" 
                @click="handleDeleteRole(row)"
                :disabled="row.id === '1'"
              >
                <d-icon name="delete" />
              </d-button>
            </d-button-group>
          </template>
        </d-table>

        <!-- 分页 -->
        <div class="pagination-wrapper">
          <d-pagination 
            v-model="currentPage"
            :total="totalRoles"
            :page-size="pageSize"
            :page-sizes="[10, 20, 50]"
            show-size-changer
            show-quick-jumper
            show-total
            @change="handlePageChange"
            @size-change="handleSizeChange"
          />
        </div>
      </d-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '../../stores/app'

interface Role {
  id: string
  name: string
  description: string
  icon: string
  iconName: string
  color: string
  userCount: number
  permissions: string[]
  status: boolean
}

const appStore = useAppStore()

// 搜索和筛选
const searchKeyword = ref('')
const statusFilter = ref('all')
const currentPage = ref(1)
const pageSize = ref(10)

// 表格列配置
const columns = ref([
  {
    key: 'icon',
    title: '图标',
    width: 80,
    cellClass: 'text-center'
  },
  {
    key: 'name',
    title: '角色名称',
    width: 120
  },
  {
    key: 'description',
    title: '描述',
    minWidth: 200
  },
  {
    key: 'userCount',
    title: '用户数量',
    width: 100,
    cellClass: 'text-center'
  },
  {
    key: 'permissions',
    title: '权限',
    minWidth: 250
  },
  {
    key: 'status',
    title: '状态',
    width: 80,
    cellClass: 'text-center'
  },
  {
    key: 'actions',
    title: '操作',
    width: 120,
    cellClass: 'text-center'
  }
])

const roles = ref<Role[]>([
  {
    id: '1',
    name: '超级管理员',
    description: '拥有系统所有权限的最高级别管理员',
    icon: 'icon-admin',
    iconName: 'admin',
    color: '#ff6b6b',
    userCount: 2,
    permissions: ['all'],
    status: true
  },
  {
    id: '2',
    name: '内容管理员',
    description: '负责内容的创建、编辑和发布',
    icon: 'icon-content',
    iconName: 'content',
    color: '#4ecdc4',
    userCount: 5,
    permissions: ['content.create', 'content.edit', 'content.publish'],
    status: true
  },
  {
    id: '3',
    name: '普通用户',
    description: '系统的基础用户角色',
    icon: 'icon-user',
    iconName: 'user',
    color: '#96ceb4',
    userCount: 128,
    permissions: ['profile.view', 'profile.edit'],
    status: true
  }
])

// 筛选后的角色列表
const filteredRoles = computed(() => {
  let filtered = roles.value
  
  // 搜索筛选
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    filtered = filtered.filter(role => 
      role.name.toLowerCase().includes(keyword) ||
      role.description.toLowerCase().includes(keyword)
    )
  }
  
  // 状态筛选
  if (statusFilter.value !== 'all') {
    const isActive = statusFilter.value === 'active'
    filtered = filtered.filter(role => role.status === isActive)
  }
  
  // 分页
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filtered.slice(start, end)
})

// 总数
const totalRoles = computed(() => {
  let filtered = roles.value
  
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    filtered = filtered.filter(role => 
      role.name.toLowerCase().includes(keyword) ||
      role.description.toLowerCase().includes(keyword)
    )
  }
  
  if (statusFilter.value !== 'all') {
    const isActive = statusFilter.value === 'active'
    filtered = filtered.filter(role => role.status === isActive)
  }
  
  return filtered.length
})

// 重置筛选
const resetFilters = () => {
  searchKeyword.value = ''
  statusFilter.value = 'all'
  currentPage.value = 1
}

// 分页处理
const handlePageChange = (page: number) => {
  currentPage.value = page
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
}

// 状态切换
const handleStatusChange = (role: Role) => {
  console.log('切换角色状态:', role.name, role.status)
}

// 角色操作
const handleAddRole = () => {
  console.log('添加角色')
}

const handleViewRole = (role: Role) => {
  console.log('查看角色:', role)
}

const handleEditRole = (role: Role) => {
  console.log('编辑角色:', role)
}

const handleDeleteRole = (role: Role) => {
  console.log('删除角色:', role)
}

onMounted(() => {
  appStore.setBreadcrumbs([
    { title: '首页', path: '/' },
    { title: '用户管理', path: '/user' },
    { title: '高级管理', path: '/user/advanced' },
    { title: '角色管理', path: '/user/roles' }
  ])
})
</script>

<style scoped>
.roles-page {
  padding: 24px;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--devui-text);
  margin: 0 0 8px 0;
}

.page-description {
  color: var(--devui-text-weak);
  margin: 0;
}

.content-card {
  background: var(--devui-base-bg);
  border-radius: 8px;
  overflow: hidden;
}

.card-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--devui-dividing-line);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--devui-text);
  margin: 0;
}

/* 搜索区域样式 */
.search-section {
  padding: 20px 24px;
  border-bottom: 1px solid var(--devui-dividing-line);
  background: var(--devui-base-bg-dark);
}

/* 表格样式 */
.roles-table {
  margin: 0;
}

.roles-table :deep(.devui-table) {
  border-radius: 0;
}

.roles-table :deep(.text-center) {
  text-align: center;
}

/* 权限标签样式 */
.permission-tag {
  margin-right: 4px;
  margin-bottom: 4px;
}

/* 分页样式 */
.pagination-wrapper {
  padding: 20px 24px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid var(--devui-dividing-line);
  background: var(--devui-base-bg);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .roles-page {
    padding: 16px;
  }
  
  .search-section {
    padding: 16px;
  }
  
  .pagination-wrapper {
    padding: 16px;
    justify-content: center;
  }
}
</style>