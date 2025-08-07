<template>
  <div class="dashboard">
    <d-card class="welcome-card">
      <template #header>
        <h2>欢迎回来，{{ userStore.user?.username }}！</h2>
      </template>
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
      <d-col :span="12">
        <d-card>
          <template #header>
            <h3>访问趋势</h3>
          </template>
          <div class="chart-placeholder">
            <p>这里可以放置图表组件</p>
          </div>
        </d-card>
      </d-col>
      <d-col :span="12">
        <d-card>
          <template #header>
            <h3>最新动态</h3>
          </template>
          <d-list>
            <d-list-item v-for="item in activities" :key="item.id">
              <div class="activity-item">
                <d-avatar size="sm" :src="item.avatar" />
                <div class="activity-content">
                  <div class="activity-text">{{ item.text }}</div>
                  <div class="activity-time">{{ item.time }}</div>
                </div>
              </div>
            </d-list-item>
          </d-list>
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

const activities = ref([
  { id: 1, text: '用户张三完成了订单支付', time: '2分钟前', avatar: 'https://via.placeholder.com/32' },
  { id: 2, text: '系统完成了数据备份', time: '5分钟前', avatar: 'https://via.placeholder.com/32' },
  { id: 3, text: '新用户李四注册成功', time: '10分钟前', avatar: 'https://via.placeholder.com/32' },
  { id: 4, text: '订单#12345已发货', time: '15分钟前', avatar: 'https://via.placeholder.com/32' }
])

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

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 4px;
  color: #666;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.activity-content {
  flex: 1;
}

.activity-text {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

.activity-time {
  font-size: 12px;
  color: #999;
}
</style>