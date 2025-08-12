<template>
  <div class="logs-page">
    <div class="page-header">
      <h1 class="page-title">系统日志</h1>
      <p class="page-description">查看和管理系统运行日志</p>
    </div>
    
    <div class="page-content">
      <d-card class="content-card">
        <template #header>
          <div class="card-header">
            <div class="header-left">
              <span class="card-title">日志记录</span>
              <div class="filter-controls">
                <d-select v-model="levelFilter" size="sm" style="width: 120px; margin-right: 12px;">
                  <d-option value="all">全部级别</d-option>
                  <d-option value="info">信息</d-option>
                  <d-option value="warning">警告</d-option>
                  <d-option value="error">错误</d-option>
                  <d-option value="debug">调试</d-option>
                </d-select>
                <d-select v-model="moduleFilter" size="sm" style="width: 140px;">
                  <d-option value="all">全部模块</d-option>
                  <d-option value="auth">认证模块</d-option>
                  <d-option value="user">用户模块</d-option>
                  <d-option value="system">系统模块</d-option>
                  <d-option value="api">API模块</d-option>
                </d-select>
              </div>
            </div>
            <div class="header-right">
              <d-input 
                v-model="searchQuery"
                placeholder="搜索日志内容..."
                size="sm"
                style="width: 200px; margin-right: 12px;"
              >
                <template #prefix>
                  <i class="icon-search"></i>
                </template>
              </d-input>
              <d-button @click="handleRefresh">
                <i class="icon-refresh"></i>
                刷新
              </d-button>
              <d-button type="primary" @click="handleExport">
                <i class="icon-download"></i>
                导出
              </d-button>
            </div>
          </div>
        </template>
        
        <div class="logs-container">
          <div class="logs-stats">
            <div class="stat-item">
              <div class="stat-value">{{ totalLogs }}</div>
              <div class="stat-label">总日志数</div>
            </div>
            <div class="stat-item error">
              <div class="stat-value">{{ errorCount }}</div>
              <div class="stat-label">错误数</div>
            </div>
            <div class="stat-item warning">
              <div class="stat-value">{{ warningCount }}</div>
              <div class="stat-label">警告数</div>
            </div>
            <div class="stat-item info">
              <div class="stat-value">{{ infoCount }}</div>
              <div class="stat-label">信息数</div>
            </div>
          </div>
          
          <div class="logs-list">
            <div 
              v-for="log in filteredLogs" 
              :key="log.id" 
              class="log-item"
              :class="log.level"
            >
              <div class="log-header">
                <div class="log-level">
                  <i :class="getLevelIcon(log.level)"></i>
                  <span class="level-text">{{ getLevelText(log.level) }}</span>
                </div>
                <div class="log-time">{{ formatTime(log.timestamp) }}</div>
              </div>
              
              <div class="log-content">
                <div class="log-message">{{ log.message }}</div>
                <div class="log-meta">
                  <span class="meta-item">
                    <i class="icon-module"></i>
                    {{ log.module }}
                  </span>
                  <span class="meta-item">
                    <i class="icon-user"></i>
                    {{ log.user || '系统' }}
                  </span>
                  <span class="meta-item">
                    <i class="icon-ip"></i>
                    {{ log.ip }}
                  </span>
                </div>
                
                <div v-if="log.details" class="log-details">
                  <d-collapse>
                    <d-collapse-item title="详细信息">
                      <pre class="details-content">{{ JSON.stringify(log.details, null, 2) }}</pre>
                    </d-collapse-item>
                  </d-collapse>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="filteredLogs.length === 0" class="empty-state">
            <div class="empty-icon">
              <i class="icon-empty"></i>
            </div>
            <h3>暂无日志</h3>
            <p>{{ searchQuery ? '没有找到匹配的日志记录' : '系统暂无日志记录' }}</p>
          </div>
          
          <div class="pagination">
            <d-pagination
              v-model="currentPage"
              :total="filteredLogs.length"
              :page-size="pageSize"
              show-size-changer
              show-quick-jumper
              @change="handlePageChange"
            />
          </div>
        </div>
      </d-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '../../stores/app'

interface LogEntry {
  id: string
  level: 'info' | 'warning' | 'error' | 'debug'
  message: string
  module: string
  user?: string
  ip: string
  timestamp: string
  details?: any
}

const appStore = useAppStore()

const searchQuery = ref('')
const levelFilter = ref('all')
const moduleFilter = ref('all')
const currentPage = ref(1)
const pageSize = ref(20)

const logs = ref<LogEntry[]>([
  {
    id: '1',
    level: 'info',
    message: '用户登录成功',
    module: 'auth',
    user: 'admin',
    ip: '192.168.1.100',
    timestamp: '2024-01-15 14:30:25',
    details: {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      sessionId: 'sess_123456789'
    }
  },
  {
    id: '2',
    level: 'warning',
    message: '用户尝试访问未授权页面',
    module: 'auth',
    user: 'user001',
    ip: '192.168.1.101',
    timestamp: '2024-01-15 14:25:10',
    details: {
      requestedUrl: '/admin/system/settings',
      userRole: 'user'
    }
  },
  {
    id: '3',
    level: 'error',
    message: '数据库连接失败',
    module: 'system',
    ip: '127.0.0.1',
    timestamp: '2024-01-15 14:20:05',
    details: {
      error: 'Connection timeout',
      database: 'main_db',
      retryCount: 3
    }
  },
  {
    id: '4',
    level: 'info',
    message: '用户创建成功',
    module: 'user',
    user: 'admin',
    ip: '192.168.1.100',
    timestamp: '2024-01-15 14:15:30',
    details: {
      newUserId: 'user_789',
      userName: 'newuser',
      userRole: 'user'
    }
  },
  {
    id: '5',
    level: 'debug',
    message: 'API请求处理完成',
    module: 'api',
    user: 'user002',
    ip: '192.168.1.102',
    timestamp: '2024-01-15 14:10:15',
    details: {
      endpoint: '/api/users/list',
      method: 'GET',
      responseTime: '125ms',
      statusCode: 200
    }
  },
  {
    id: '6',
    level: 'error',
    message: 'API请求失败',
    module: 'api',
    user: 'user003',
    ip: '192.168.1.103',
    timestamp: '2024-01-15 14:05:45',
    details: {
      endpoint: '/api/data/export',
      method: 'POST',
      error: 'Invalid parameters',
      statusCode: 400
    }
  },
  {
    id: '7',
    level: 'warning',
    message: '系统内存使用率过高',
    module: 'system',
    ip: '127.0.0.1',
    timestamp: '2024-01-15 14:00:00',
    details: {
      memoryUsage: '85%',
      threshold: '80%',
      availableMemory: '2.1GB'
    }
  },
  {
    id: '8',
    level: 'info',
    message: '系统备份完成',
    module: 'system',
    ip: '127.0.0.1',
    timestamp: '2024-01-15 13:55:20',
    details: {
      backupSize: '1.2GB',
      backupLocation: '/backups/2024-01-15/',
      duration: '5m 32s'
    }
  }
])

const filteredLogs = computed(() => {
  let result = logs.value
  
  if (levelFilter.value !== 'all') {
    result = result.filter(log => log.level === levelFilter.value)
  }
  
  if (moduleFilter.value !== 'all') {
    result = result.filter(log => log.module === moduleFilter.value)
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(log => 
      log.message.toLowerCase().includes(query) ||
      log.module.toLowerCase().includes(query) ||
      (log.user && log.user.toLowerCase().includes(query))
    )
  }
  
  return result
})

const totalLogs = computed(() => logs.value.length)
const errorCount = computed(() => logs.value.filter(log => log.level === 'error').length)
const warningCount = computed(() => logs.value.filter(log => log.level === 'warning').length)
const infoCount = computed(() => logs.value.filter(log => log.level === 'info').length)

const getLevelIcon = (level: string) => {
  const iconMap = {
    info: 'icon-info',
    warning: 'icon-warning',
    error: 'icon-error',
    debug: 'icon-debug'
  }
  return iconMap[level as keyof typeof iconMap] || 'icon-unknown'
}

const getLevelText = (level: string) => {
  const textMap = {
    info: '信息',
    warning: '警告',
    error: '错误',
    debug: '调试'
  }
  return textMap[level as keyof typeof textMap] || level
}

const formatTime = (timestamp: string) => {
  return timestamp
}

const handleRefresh = () => {
  console.log('刷新日志')
}

const handleExport = () => {
  console.log('导出日志')
}

const handlePageChange = (page: number) => {
  currentPage.value = page
}

onMounted(() => {
  appStore.setBreadcrumbs([
    { title: '首页', path: '/' },
    { title: '系统管理', path: '/system' },
    { title: '系统日志', path: '/system/logs' }
  ])
})
</script>

<style scoped>
.logs-page {
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

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-right {
  display: flex;
  align-items: center;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.filter-controls {
  display: flex;
  gap: 12px;
}

.logs-container {
  padding: 20px 0;
}

.logs-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 8px;
}

.stat-item {
  flex: 1;
  text-align: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
  border-left: 4px solid #e5e7eb;
}

.stat-item.error {
  border-left-color: #ef4444;
}

.stat-item.warning {
  border-left-color: #f59e0b;
}

.stat-item.info {
  border-left-color: #3b82f6;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.logs-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.log-item {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid #e5e7eb;
}

.log-item.info {
  border-left-color: #3b82f6;
}

.log-item.warning {
  border-left-color: #f59e0b;
}

.log-item.error {
  border-left-color: #ef4444;
}

.log-item.debug {
  border-left-color: #8b5cf6;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.log-level {
  display: flex;
  align-items: center;
  gap: 8px;
}

.log-level i {
  font-size: 16px;
}

.level-text {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.log-item.info .level-text {
  color: #3b82f6;
}

.log-item.warning .level-text {
  color: #f59e0b;
}

.log-item.error .level-text {
  color: #ef4444;
}

.log-item.debug .level-text {
  color: #8b5cf6;
}

.log-time {
  font-size: 12px;
  color: #6b7280;
  font-family: 'Monaco', 'Menlo', monospace;
}

.log-message {
  font-size: 14px;
  color: #1f2937;
  line-height: 1.5;
  margin-bottom: 8px;
}

.log-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6b7280;
}

.meta-item i {
  font-size: 14px;
}

.log-details {
  margin-top: 12px;
}

.details-content {
  background: #f8fafc;
  padding: 12px;
  border-radius: 4px;
  font-size: 12px;
  color: #374151;
  overflow-x: auto;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 18px;
  margin: 0 0 8px 0;
  color: #374151;
}

.empty-state p {
  font-size: 14px;
  margin: 0;
}

.pagination {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.icon-search::before { content: '🔍'; }
.icon-refresh::before { content: '🔄'; }
.icon-download::before { content: '⬇️'; }
.icon-module::before { content: '📦'; }
.icon-user::before { content: '👤'; }
.icon-ip::before { content: '🌐'; }
.icon-info::before { content: 'ℹ️'; }
.icon-warning::before { content: '⚠️'; }
.icon-error::before { content: '❌'; }
.icon-debug::before { content: '🐛'; }
.icon-empty::before { content: '📋'; }
</style>