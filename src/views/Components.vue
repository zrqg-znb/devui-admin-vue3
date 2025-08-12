<template>
  <div class="components-page">
    <d-card class="page-card">
      <template #avatar>
        <div class="card-icon">🧩</div>
      </template>
      <template #title>
        组件
      </template>
      <template #subtitle>
        DevUI 组件库
      </template>
      <p>DevUI 提供了丰富的企业级 UI 组件，帮助设计师和开发者快速构建功能完善、交互一致的中后台产品。</p>
      
      <div class="component-categories">
        <div class="category-item">
          <div class="category-header">
            <div class="category-icon">📊</div>
            <div class="category-title">数据展示</div>
          </div>
          <div class="component-list">
            <div class="component-tag">表格</div>
            <div class="component-tag">图表</div>
            <div class="component-tag">列表</div>
            <div class="component-tag">树</div>
            <div class="component-tag">卡片</div>
          </div>
        </div>
        
        <div class="category-item">
          <div class="category-header">
            <div class="category-icon">📝</div>
            <div class="category-title">表单控件</div>
          </div>
          <div class="component-list">
            <div class="component-tag">输入框</div>
            <div class="component-tag">选择器</div>
            <div class="component-tag">日期选择</div>
            <div class="component-tag">开关</div>
            <div class="component-tag">滑块</div>
          </div>
        </div>
        
        <div class="category-item">
          <div class="category-header">
            <div class="category-icon">🔔</div>
            <div class="category-title">反馈</div>
          </div>
          <div class="component-list">
            <div class="component-tag">对话框</div>
            <div class="component-tag">抽屉</div>
            <div class="component-tag">通知</div>
            <div class="component-tag">警告</div>
            <div class="component-tag">加载</div>
          </div>
        </div>
      </div>
    </d-card>
  </div>
</template>

<script setup lang="ts">
// 组件页面
</script>

<style scoped>
.components-page {
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

.component-categories {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.category-item {
  background-color: #f9fafc;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.3s ease;
}

.category-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.category-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.category-icon {
  font-size: 20px;
  margin-right: 12px;
}

.category-title {
  font-size: 16px;
  font-weight: 500;
  color: #252b3a;
}

.component-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.component-tag {
  padding: 6px 12px;
  background-color: #e9edfa;
  color: #5e7ce0;
  border-radius: 4px;
  font-size: 13px;
  transition: all 0.2s ease;
}

.component-tag:hover {
  background-color: #d0d9f5;
  transform: scale(1.05);
}
</style>