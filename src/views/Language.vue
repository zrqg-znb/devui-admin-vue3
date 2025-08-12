<template>
  <div class="language-page">
    <d-card class="page-card">
      <template #avatar>
        <div class="card-icon">🔤</div>
      </template>
      <template #title>
        语言
      </template>
      <template #subtitle>
        编程语言与开发技术
      </template>
      <p>这里展示了与编程语言和开发技术相关的内容，包括前端、后端、移动端等多种技术栈的介绍和最佳实践。</p>
      <div class="language-list">
        <div class="language-item">
          <div class="language-icon">🟢</div>
          <div class="language-content">
            <div class="language-title">Vue.js</div>
            <div class="language-desc">渐进式JavaScript框架，用于构建用户界面</div>
          </div>
        </div>
        <div class="language-item">
          <div class="language-icon">🔵</div>
          <div class="language-content">
            <div class="language-title">TypeScript</div>
            <div class="language-desc">JavaScript的超集，添加了类型系统</div>
          </div>
        </div>
        <div class="language-item">
          <div class="language-icon">🟣</div>
          <div class="language-content">
            <div class="language-title">Node.js</div>
            <div class="language-desc">基于Chrome V8引擎的JavaScript运行环境</div>
          </div>
        </div>
        <div class="language-item">
          <div class="language-icon">🟠</div>
          <div class="language-content">
            <div class="language-title">Rust</div>
            <div class="language-desc">系统编程语言，注重安全性、并发性和性能</div>
          </div>
        </div>
      </div>
    </d-card>
  </div>
</template>

<script setup lang="ts">
// 语言页面组件
</script>

<style scoped>
.language-page {
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

.language-list {
  margin-top: 20px;
}

.language-item {
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
  background-color: #f9fafc;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.language-item:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.language-icon {
  font-size: 24px;
  margin-right: 16px;
}

.language-content {
  flex: 1;
}

.language-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
  color: #252b3a;
}

.language-desc {
  font-size: 14px;
  color: #575d6c;
  line-height: 1.5;
}
</style>