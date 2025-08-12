<template>
  <div class="devui-admin-page">
    <d-card class="page-card">
      <template #avatar>
        <div class="card-icon">📦</div>
      </template>
      <template #title>
        DevUI Admin
      </template>
      <template #subtitle>
        基于 Vue3 和 DevUI 的中后台解决方案
      </template>
      <p>DevUI Admin 是一个基于 Vue3、Vite、TypeScript 和 DevUI 组件库的中后台解决方案，提供了丰富的组件和功能，帮助开发者快速构建企业级中后台产品。</p>
      
      <div class="feature-list">
        <div class="feature-item">
          <div class="feature-icon">🚀</div>
          <div class="feature-content">
            <div class="feature-title">快速开发</div>
            <div class="feature-desc">基于 Vue3 和 Vite，享受极速的开发体验</div>
          </div>
        </div>
        
        <div class="feature-item">
          <div class="feature-icon">🧩</div>
          <div class="feature-content">
            <div class="feature-title">丰富组件</div>
            <div class="feature-desc">集成 DevUI 组件库，提供丰富的企业级组件</div>
          </div>
        </div>
        
        <div class="feature-item">
          <div class="feature-icon">🎨</div>
          <div class="feature-content">
            <div class="feature-title">主题定制</div>
            <div class="feature-desc">支持多种主题切换和自定义主题</div>
          </div>
        </div>
        
        <div class="feature-item">
          <div class="feature-icon">📱</div>
          <div class="feature-content">
            <div class="feature-title">响应式设计</div>
            <div class="feature-desc">适配不同尺寸的屏幕和设备</div>
          </div>
        </div>
      </div>
      
      <div class="admin-stats">
        <div class="stat-card">
          <div class="stat-value">10K+</div>
          <div class="stat-label">下载量</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-value">50+</div>
          <div class="stat-label">组件</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-value">20+</div>
          <div class="stat-label">页面模板</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-value">5+</div>
          <div class="stat-label">主题</div>
        </div>
      </div>
    </d-card>
  </div>
</template>

<script setup lang="ts">
// DevUI Admin 页面组件
</script>

<style scoped>
.devui-admin-page {
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

.feature-list {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  background-color: #f9fafc;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background-color: #f2f5fc;
  transform: translateX(5px);
}

.feature-icon {
  font-size: 24px;
  margin-right: 16px;
  margin-top: 2px;
}

.feature-content {
  flex: 1;
}

.feature-title {
  font-size: 16px;
  font-weight: 500;
  color: #252b3a;
  margin-bottom: 4px;
}

.feature-desc {
  font-size: 14px;
  color: #575d6c;
  line-height: 1.5;
}

.admin-stats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
  margin-top: 24px;
}

.stat-card {
  background-color: #f2f5fc;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-card:hover {
  background-color: #e9edfa;
  transform: translateY(-5px);
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #5e7ce0;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #575d6c;
}
</style>