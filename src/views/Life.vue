<template>
  <div class="life-page">
    <d-card class="page-card">
      <template #avatar>
        <div class="card-icon">✅</div>
      </template>
      <template #title>
        生活
      </template>
      <template #subtitle>
        生活服务与工具
      </template>
      <p>这里提供了各种生活相关的服务和工具，帮助您更好地规划和管理日常生活。</p>
      
      <div class="life-tools">
        <div class="tool-card">
          <div class="tool-icon">📅</div>
          <div class="tool-title">日程管理</div>
          <div class="tool-desc">高效规划您的时间，管理日程安排</div>
          <d-button variant="solid" color="primary" size="sm" class="tool-btn">查看详情</d-button>
        </div>
        
        <div class="tool-card">
          <div class="tool-icon">📝</div>
          <div class="tool-title">待办事项</div>
          <div class="tool-desc">记录和跟踪您的任务和待办事项</div>
          <d-button variant="solid" color="primary" size="sm" class="tool-btn">查看详情</d-button>
        </div>
        
        <div class="tool-card">
          <div class="tool-icon">💰</div>
          <div class="tool-title">财务管理</div>
          <div class="tool-desc">跟踪收入和支出，管理个人财务</div>
          <d-button variant="solid" color="primary" size="sm" class="tool-btn">查看详情</d-button>
        </div>
        
        <div class="tool-card">
          <div class="tool-icon">🍽️</div>
          <div class="tool-title">饮食记录</div>
          <div class="tool-desc">记录饮食习惯，保持健康生活</div>
          <d-button variant="solid" color="primary" size="sm" class="tool-btn">查看详情</d-button>
        </div>
      </div>
    </d-card>
  </div>
</template>

<script setup lang="ts">
// 生活页面组件
</script>

<style scoped>
.life-page {
  padding: 20px;
}

.page-card {
  margin-bottom: 20px;
}

.card-icon {
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f5fc;
  border-radius: 8px;
}

.life-tools {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.tool-card {
  background-color: #f9fafc;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
}

.tool-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.tool-icon {
  font-size: 32px;
  margin-bottom: 16px;
}

.tool-title {
  font-size: 16px;
  font-weight: 500;
  color: #252b3a;
  margin-bottom: 8px;
}

.tool-desc {
  font-size: 14px;
  color: #575d6c;
  line-height: 1.5;
  margin-bottom: 16px;
}

.tool-btn {
  margin-top: auto;
}
</style>