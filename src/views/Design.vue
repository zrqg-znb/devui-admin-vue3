<template>
  <div class="design-page">
    <d-card class="page-card">
      <template #avatar>
        <div class="card-icon">🎨</div>
      </template>
      <template #title>
        设计
      </template>
      <template #subtitle>
        DevUI Design 设计系统
      </template>
      <p>DevUI Design 是面向企业中后台产品的设计系统，提供了丰富的设计原则、设计资源和组件，帮助设计师和开发者更高效地构建企业级产品。</p>
      <div class="design-features">
        <div class="feature-item">
          <div class="feature-icon">🔍</div>
          <div class="feature-title">设计原则</div>
          <div class="feature-desc">清晰、高效、一致、可控的设计原则</div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🎯</div>
          <div class="feature-title">设计模式</div>
          <div class="feature-desc">标准化的设计模式，提高设计和开发效率</div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🎭</div>
          <div class="feature-title">设计资源</div>
          <div class="feature-desc">丰富的设计资源，支持多种设计工具</div>
        </div>
      </div>
    </d-card>
  </div>
</template>

<script setup lang="ts">
// 设计页面组件
</script>

<style scoped>
.design-page {
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

.design-features {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.feature-item {
  flex: 1;
  min-width: 200px;
  padding: 20px;
  background-color: #f9fafc;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.feature-icon {
  font-size: 24px;
  margin-bottom: 10px;
}

.feature-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #252b3a;
}

.feature-desc {
  font-size: 14px;
  color: #575d6c;
  line-height: 1.5;
}
</style>