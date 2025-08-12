<template>
  <div class="devui-icons-page">
    <d-card class="page-card">
      <template #avatar>
        <div class="card-icon">🔍</div>
      </template>
      <template #title>
        DevUI 图标库
      </template>
      <template #subtitle>
        DevUI 设计风格的图标合集
      </template>
      <p>DevUI 图标库提供了一套风格统一、简洁优雅的图标集合，适用于各种企业级应用场景。所有图标均支持多种尺寸和颜色定制，满足不同设计需求。</p>
      
      <div class="icon-search">
        <d-search-box placeholder="搜索图标..." class="icon-search-input"></d-search-box>
        <div class="icon-categories">
          <d-tag v-for="category in iconCategories" :key="category.value" :color="category.color" checkable>{{ category.name }}</d-tag>
        </div>
      </div>
      
      <div class="icon-grid">
        <div v-for="(icon, index) in icons" :key="index" class="icon-item">
          <div class="icon-display">
            <span class="icon-emoji">{{ icon.emoji }}</span>
          </div>
          <div class="icon-name">{{ icon.name }}</div>
        </div>
      </div>
    </d-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 图标分类
const iconCategories = ref([
  { name: '方向', value: 'direction', color: 'blue' },
  { name: '提示', value: 'prompt', color: 'green' },
  { name: '编辑', value: 'edit', color: 'orange' },
  { name: '数据', value: 'data', color: 'purple' },
  { name: '通用', value: 'common', color: 'red' },
])

// 图标数据
const icons = ref([
  { name: '向上', emoji: '↑', category: 'direction' },
  { name: '向下', emoji: '↓', category: 'direction' },
  { name: '向左', emoji: '←', category: 'direction' },
  { name: '向右', emoji: '→', category: 'direction' },
  { name: '添加', emoji: '+', category: 'edit' },
  { name: '删除', emoji: '×', category: 'edit' },
  { name: '编辑', emoji: '✎', category: 'edit' },
  { name: '保存', emoji: '💾', category: 'edit' },
  { name: '搜索', emoji: '🔍', category: 'common' },
  { name: '设置', emoji: '⚙️', category: 'common' },
  { name: '用户', emoji: '👤', category: 'common' },
  { name: '主页', emoji: '🏠', category: 'common' },
  { name: '通知', emoji: '🔔', category: 'prompt' },
  { name: '警告', emoji: '⚠️', category: 'prompt' },
  { name: '成功', emoji: '✅', category: 'prompt' },
  { name: '错误', emoji: '❌', category: 'prompt' },
  { name: '图表', emoji: '📊', category: 'data' },
  { name: '表格', emoji: '📋', category: 'data' },
  { name: '文件', emoji: '📄', category: 'data' },
  { name: '文件夹', emoji: '📁', category: 'data' },
])
</script>

<style scoped>
.devui-icons-page {
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

.icon-search {
  margin: 24px 0;
}

.icon-search-input {
  margin-bottom: 16px;
  width: 100%;
}

.icon-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 8px;
  background-color: #f9fafc;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.icon-item:hover {
  background-color: #f2f5fc;
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.icon-display {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.icon-emoji {
  font-size: 24px;
}

.icon-name {
  font-size: 12px;
  color: #575d6c;
  text-align: center;
}
</style>