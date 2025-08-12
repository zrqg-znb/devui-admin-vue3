<template>
  <div class="dashboard">
    <d-card class="welcome-card">
      <p>今天是个美好的一天，开始您的工作吧！</p>
    </d-card>

    <d-row :gutter="24" class="stats-row">
      <d-col :span="6" v-for="stat in stats" :key="stat.title">
        <d-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" :style="{ backgroundColor: stat.color }">
              <d-icon :name="stat.icon" />
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-title">{{ stat.title }}</div>
            </div>
          </div>
        </d-card>
      </d-col>
    </d-row>

    <d-row :gutter="24" class="chart-row">
      <d-col :span="16">
        <d-card>
          <template #header>
            <div class="card-header">
              <h3>数据概览</h3>
              <d-button-group>
                <d-button size="sm" variant="outline">今日</d-button>
                <d-button size="sm" variant="outline">本周</d-button>
                <d-button size="sm" variant="outline">本月</d-button>
              </d-button-group>
            </div>
          </template>
          <div class="data-overview">
            <d-row :gutter="16">
              <d-col :span="8" v-for="item in dataOverview" :key="item.label">
                <div class="overview-item">
                  <div class="overview-label">{{ item.label }}</div>
                  <div class="overview-value">{{ item.value }}</div>
                  <d-progress 
                    :percentage="item.progress" 
                    :color="item.color"
                    :show-text="false"
                    size="sm"
                  />
                  <div class="overview-change" :class="item.trend">
                    <d-icon :name="item.trend === 'up' ? 'arrow-up' : 'arrow-down'" />
                    {{ item.change }}
                  </div>
                </div>
              </d-col>
            </d-row>
          </div>
        </d-card>
      </d-col>
      <d-col :span="8">
        <d-card>
          <template #header>
            <div class="card-header">
              <h3>快捷操作</h3>
              <d-tag color="primary" size="sm">常用</d-tag>
            </div>
          </template>
          <div class="quick-actions">
            <d-button 
              v-for="action in quickActions" 
              :key="action.label"
              :variant="action.variant"
              :color="action.color"
              size="lg"
              block
              class="action-btn"
              @click="handleQuickAction(action.action)"
            >
              <d-icon :name="action.icon" />
              {{ action.label }}
            </d-button>
          </div>
        </d-card>
      </d-col>
    </d-row>

    <d-row :gutter="24" class="activity-row">
      <d-col :span="12">
        <d-card>
          <template #header>
            <div class="card-header">
              <h3>最新动态</h3>
              <d-button size="sm" variant="text">查看全部</d-button>
            </div>
          </template>
          <d-timeline>
            <d-timeline-item 
              v-for="item in activities" 
              :key="item.id"
              :color="item.type === 'success' ? 'success' : item.type === 'warning' ? 'warning' : 'primary'"
            >
              <template #dot>
                <d-icon :name="item.icon" />
              </template>
              <div class="timeline-content">
                <div class="timeline-text">{{ item.text }}</div>
                <div class="timeline-time">{{ item.time }}</div>
              </div>
            </d-timeline-item>
          </d-timeline>
        </d-card>
      </d-col>
      <d-col :span="12">
        <d-card>
          <template #header>
            <div class="card-header">
              <h3>系统状态</h3>
              <d-tag color="success" size="sm">正常</d-tag>
            </div>
          </template>
          <div class="system-status">
            <div class="status-item" v-for="status in systemStatus" :key="status.name">
              <div class="status-info">
                <span class="status-name">{{ status.name }}</span>
                <span class="status-value">{{ status.value }}</span>
              </div>
              <d-progress 
                :percentage="status.percentage" 
                :color="status.color"
                size="sm"
              />
            </div>
          </div>
        </d-card>
      </d-col>
    </d-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useAppStore } from '../stores/app'

const userStore = useUserStore()
const appStore = useAppStore()

const stats = ref([
  { title: '总用户数', value: '1,234', icon: 'user', color: '#5e7ce0' },
  { title: '今日访问', value: '856', icon: 'eye', color: '#50d4ab' },
  { title: '订单数量', value: '2,345', icon: 'shopping-cart', color: '#fac20a' },
  { title: '收入', value: '¥12,345', icon: 'money', color: '#f66f6a' }
])

const dataOverview = ref([
  { label: '转化率', value: '68.5%', progress: 68, color: '#5e7ce0', trend: 'up', change: '+12%' },
  { label: '活跃用户', value: '2,345', progress: 85, color: '#50d4ab', trend: 'up', change: '+8%' },
  { label: '跳出率', value: '32.1%', progress: 32, color: '#f66f6a', trend: 'down', change: '-5%' }
])

const quickActions = ref([
  { label: '新建用户', icon: 'user-add', variant: 'solid', color: 'primary', action: 'createUser' },
  { label: '数据导出', icon: 'download', variant: 'outline', color: 'success', action: 'exportData' },
  { label: '系统设置', icon: 'settings', variant: 'outline', color: 'warning', action: 'systemSettings' },
  { label: '查看报告', icon: 'file-text', variant: 'outline', color: 'info', action: 'viewReport' }
])

const activities = ref([
  { id: 1, text: '用户张三完成了订单支付', time: '2分钟前', icon: 'check-circle', type: 'success' },
  { id: 2, text: '系统完成了数据备份', time: '5分钟前', icon: 'database', type: 'info' },
  { id: 3, text: '新用户李四注册成功', time: '10分钟前', icon: 'user-add', type: 'success' },
  { id: 4, text: '订单#12345已发货', time: '15分钟前', icon: 'truck', type: 'warning' }
])

const systemStatus = ref([
  { name: 'CPU使用率', value: '45%', percentage: 45, color: '#5e7ce0' },
  { name: '内存使用率', value: '68%', percentage: 68, color: '#50d4ab' },
  { name: '磁盘使用率', value: '32%', percentage: 32, color: '#fac20a' },
  { name: '网络带宽', value: '78%', percentage: 78, color: '#f66f6a' }
])

const handleQuickAction = (action: string) => {
  console.log('执行快捷操作:', action)
  // 这里可以添加具体的操作逻辑
}

onMounted(() => {
  appStore.setBreadcrumbs([
    { title: '首页', path: '/' },
    { title: '仪表盘', path: '/dashboard' }
  ])
})
</script>

<style scoped>
.dashboard {
  space-y: 24px;
}

.welcome-card {
  margin-bottom: 24px;
}

.stats-row {
  margin-bottom: 24px;
}

.stat-card {
  height: 120px;
}

.stat-content {
  display: flex;
  align-items: center;
  height: 100%;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  margin-right: 16px;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.stat-title {
  font-size: 14px;
  color: #666;
}

/* 卡片头部样式 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.card-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

/* 数据概览样式 */
.data-overview {
  padding: 16px 0;
}

.overview-item {
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  background: #f8f9fa;
  transition: all 0.3s;
}

.overview-item:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.overview-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.overview-value {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.overview-change {
  font-size: 12px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.overview-change.up {
  color: #50d4ab;
}

.overview-change.down {
  color: #f66f6a;
}

/* 快捷操作样式 */
.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 0;
}

.action-btn {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
}

/* 时间线样式 */
.timeline-content {
  padding-left: 8px;
}

.timeline-text {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

.timeline-time {
  font-size: 12px;
  color: #999;
}

/* 系统状态样式 */
.system-status {
  padding: 16px 0;
}

.status-item {
  margin-bottom: 20px;
}

.status-item:last-child {
  margin-bottom: 0;
}

.status-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.status-name {
  font-size: 14px;
  color: #333;
}

.status-value {
  font-size: 14px;
  font-weight: 600;
  color: #666;
}

/* 响应式布局 */
.activity-row {
  margin-top: 24px;
}

@media (max-width: 768px) {
  .chart-row .d-col,
  .activity-row .d-col {
    margin-bottom: 16px;
  }
  
  .overview-item {
    padding: 12px;
  }
  
  .overview-value {
    font-size: 20px;
  }
}
</style>