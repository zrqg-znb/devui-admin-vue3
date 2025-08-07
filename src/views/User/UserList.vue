<template>
  <div class="user-list">
    <d-card>
      <template #header>
        <div class="card-header">
          <h3>用户列表</h3>
          <d-button type="primary" @click="handleAdd">
            <d-icon name="plus" />
            新增用户
          </d-button>
        </div>
      </template>

      <div class="search-bar">
        <d-input
            v-model="searchText"
            placeholder="搜索用户名或邮箱"
            style="width: 300px"
        >
          <template #suffix>
            <d-icon name="search" />
          </template>
        </d-input>
        <d-button @click="handleSearch">搜索</d-button>
      </div>

      <d-table
          :data="tableData"
          :columns="columns"
          :pagination="pagination"
          @page-change="handlePageChange"
      >
        <template #avatar="{ row }">
          <d-avatar :src="row.avatar" size="sm" />
        </template>
        <template #status="{ row }">
          <d-tag :type="row.status === 'active' ? 'success' : 'warning'">
            {{ row.status === 'active' ? '激活' : '禁用' }}
          </d-tag>
        </template>
        <template #actions="{ row }">
          <d-button size="sm" @click="handleEdit(row)">编辑</d-button>
          <d-button size="sm" type="danger" @click="handleDelete(row)">删除</d-button>
        </template>
      </d-table>
    </d-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAppStore } from '../../stores/app'

const appStore = useAppStore()

const searchText = ref('')
const tableData = ref([
  { id: 1, username: 'admin', email: 'admin@example.com', role: '管理员', status: 'active', avatar: 'https://via.placeholder.com/40' },
  { id: 2, username: 'user1', email: 'user1@example.com', role: '普通用户', status: 'active', avatar: 'https://via.placeholder.com/40' },
  { id: 3, username: 'user2', email: 'user2@example.com', role: '普通用户', status: 'inactive', avatar: 'https://via.placeholder.com/40' }
])

const columns = [
  { field: 'avatar', header: '头像', width: '80px', cellClass: 'avatar-cell' },
  { field: 'username', header: '用户名', width: '120px' },
  { field: 'email', header: '邮箱', width: '200px' },
  { field: 'role', header: '角色', width: '120px' },
  { field: 'status', header: '状态', width: '100px' },
  { field: 'actions', header: '操作', width: '150px' }
]

const pagination = ref({
  total: 100,
  pageSize: 10,
  currentPage: 1
})

const handleAdd = () => {
  console.log('Add user')
}

const handleEdit = (row: any) => {
  console.log('Edit user:', row)
}

const handleDelete = (row: any) => {
  console.log('Delete user:', row)
}

const handleSearch = () => {
  console.log('Search:', searchText.value)
}

const handlePageChange = (page: number) => {
  pagination.value.currentPage = page
}

onMounted(() => {
  appStore.setBreadcrumbs([
    { title: '首页', path: '/' },
    { title: '用户管理', path: '/user' },
    { title: '用户列表', path: '/user/list' }
  ])
})
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: center;
}
</style>