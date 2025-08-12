<template>
  <div class="document-page">
    <d-card class="page-card">
      <template #avatar>
        <div class="card-icon">📄</div>
      </template>
      <template #title>
        文档
      </template>
      <template #subtitle>
        开发文档与指南
      </template>
      <p>这里提供了全面的开发文档和指南，帮助您快速上手和深入了解我们的产品和技术。</p>
      
      <div class="doc-categories">
        <div class="doc-category">
          <div class="category-title">入门指南</div>
          <div class="doc-list">
            <div class="doc-item">
              <div class="doc-icon">📚</div>
              <div class="doc-info">
                <div class="doc-name">快速开始</div>
                <div class="doc-desc">5分钟上手DevUI开发</div>
              </div>
              <div class="doc-action">
                <d-icon name="right-outlined"></d-icon>
              </div>
            </div>
            <div class="doc-item">
              <div class="doc-icon">🔧</div>
              <div class="doc-info">
                <div class="doc-name">安装与配置</div>
                <div class="doc-desc">环境搭建与项目配置</div>
              </div>
              <div class="doc-action">
                <d-icon name="right-outlined"></d-icon>
              </div>
            </div>
          </div>
        </div>
        
        <div class="doc-category">
          <div class="category-title">组件文档</div>
          <div class="doc-list">
            <div class="doc-item">
              <div class="doc-icon">🧩</div>
              <div class="doc-info">
                <div class="doc-name">基础组件</div>
                <div class="doc-desc">按钮、表单、布局等基础组件</div>
              </div>
              <div class="doc-action">
                <d-icon name="right-outlined"></d-icon>
              </div>
            </div>
            <div class="doc-item">
              <div class="doc-icon">📊</div>
              <div class="doc-info">
                <div class="doc-name">数据组件</div>
                <div class="doc-desc">表格、图表、树形控件等</div>
              </div>
              <div class="doc-action">
                <d-icon name="right-outlined"></d-icon>
              </div>
            </div>
          </div>
        </div>
        
        <div class="doc-category">
          <div class="category-title">API参考</div>
          <div class="doc-list">
            <div class="doc-item">
              <div class="doc-icon">📖</div>
              <div class="doc-info">
                <div class="doc-name">API文档</div>
                <div class="doc-desc">详细的API接口说明</div>
              </div>
              <div class="doc-action">
                <d-icon name="right-outlined"></d-icon>
              </div>
            </div>
            <div class="doc-item">
              <div class="doc-icon">🔍</div>
              <div class="doc-info">
                <div class="doc-name">示例代码</div>
                <div class="doc-desc">常见场景的代码示例</div>
              </div>
              <div class="doc-action">
                <d-icon name="right-outlined"></d-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </d-card>
  </div>
</template>

<script setup lang="ts">
// 文档页面组件
</script>

<style scoped>
.document-page {
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

.doc-categories {
  margin-top: 24px;
}

.doc-category {
  margin-bottom: 24px;
}

.category-title {
  font-size: 16px;
  font-weight: 500;
  color: #252b3a;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e8e8e8;
}

.doc-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.doc-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #f9fafc;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.doc-item:hover {
  background-color: #f2f5fc;
  transform: translateX(5px);
}

.doc-icon {
  font-size: 24px;
  margin-right: 16px;
}

.doc-info {
  flex: 1;
}

.doc-name {
  font-size: 15px;
  font-weight: 500;
  color: #252b3a;
  margin-bottom: 4px;
}

.doc-desc {
  font-size: 13px;
  color: #575d6c;
}

.doc-action {
  color: #5e7ce0;
}
</style>