<template>
  <div class="articles-page">
    <div class="page-header">
      <h1 class="page-title">文章管理</h1>
      <p class="page-description">管理网站的所有文章内容</p>
    </div>
    
    <div class="page-content">
      <d-card class="content-card">
        <template #header>
          <div class="card-header">
            <div class="header-left">
              <span class="card-title">文章列表</span>
              <div class="filter-tabs">
                <span 
                  v-for="tab in filterTabs" 
                  :key="tab.key"
                  :class="['filter-tab', { active: activeFilter === tab.key }]"
                  @click="activeFilter = tab.key"
                >
                  {{ tab.label }}
                </span>
              </div>
            </div>
            <d-button type="primary" @click="handleCreateArticle">
              <i class="icon-add"></i>
              创建文章
            </d-button>
          </div>
        </template>
        
        <div class="articles-list">
          <div 
            v-for="article in filteredArticles" 
            :key="article.id" 
            class="article-item"
          >
            <div class="article-cover">
              <img :src="article.cover" :alt="article.title" />
              <div class="article-status" :class="article.status">
                {{ getStatusText(article.status) }}
              </div>
            </div>
            
            <div class="article-content">
              <div class="article-meta">
                <span class="article-category">{{ article.category }}</span>
                <span class="article-date">{{ formatDate(article.createdAt) }}</span>
              </div>
              
              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-summary">{{ article.summary }}</p>
              
              <div class="article-stats">
                <span class="stat-item">
                  <i class="icon-view"></i>
                  {{ article.views }}
                </span>
                <span class="stat-item">
                  <i class="icon-like"></i>
                  {{ article.likes }}
                </span>
                <span class="stat-item">
                  <i class="icon-comment"></i>
                  {{ article.comments }}
                </span>
              </div>
            </div>
            
            <div class="article-actions">
              <d-button size="sm" @click="handleEditArticle(article)">编辑</d-button>
              <d-button size="sm" @click="handleViewArticle(article)">预览</d-button>
              <d-dropdown>
                <d-button size="sm">
                  更多
                  <i class="icon-more"></i>
                </d-button>
                <template #menu>
                  <d-dropdown-item @click="handlePublishArticle(article)">
                    {{ article.status === 'published' ? '取消发布' : '发布' }}
                  </d-dropdown-item>
                  <d-dropdown-item @click="handleDuplicateArticle(article)">
                    复制
                  </d-dropdown-item>
                  <d-dropdown-item @click="handleDeleteArticle(article)" class="danger">
                    删除
                  </d-dropdown-item>
                </template>
              </d-dropdown>
            </div>
          </div>
        </div>
      </d-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '../../stores/app'

interface Article {
  id: string
  title: string
  summary: string
  cover: string
  category: string
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  views: number
  likes: number
  comments: number
}

const appStore = useAppStore()

const activeFilter = ref('all')

const filterTabs = [
  { key: 'all', label: '全部' },
  { key: 'published', label: '已发布' },
  { key: 'draft', label: '草稿' },
  { key: 'archived', label: '已归档' }
]

const articles = ref<Article[]>([
  {
    id: '1',
    title: 'Vue 3 组合式API最佳实践',
    summary: '深入探讨Vue 3组合式API的使用技巧和最佳实践，帮助开发者更好地构建现代化的Vue应用程序。',
    cover: 'https://picsum.photos/300/200?random=1',
    category: '前端开发',
    status: 'published',
    createdAt: '2024-01-15',
    views: 1250,
    likes: 89,
    comments: 23
  },
  {
    id: '2',
    title: 'TypeScript进阶指南',
    summary: '从基础到高级，全面掌握TypeScript的类型系统和高级特性，提升代码质量和开发效率。',
    cover: 'https://picsum.photos/300/200?random=2',
    category: '编程语言',
    status: 'draft',
    createdAt: '2024-01-12',
    views: 0,
    likes: 0,
    comments: 0
  },
  {
    id: '3',
    title: '现代CSS布局技术',
    summary: '探索Flexbox、Grid和Container Queries等现代CSS布局技术，创建响应式和灵活的网页布局。',
    cover: 'https://picsum.photos/300/200?random=3',
    category: '前端开发',
    status: 'published',
    createdAt: '2024-01-10',
    views: 890,
    likes: 67,
    comments: 15
  },
  {
    id: '4',
    title: 'Node.js性能优化实战',
    summary: '分享Node.js应用性能优化的实用技巧和工具，包括内存管理、异步处理和数据库优化等方面。',
    cover: 'https://picsum.photos/300/200?random=4',
    category: '后端开发',
    status: 'archived',
    createdAt: '2024-01-08',
    views: 2100,
    likes: 156,
    comments: 42
  }
])

const filteredArticles = computed(() => {
  if (activeFilter.value === 'all') {
    return articles.value
  }
  return articles.value.filter(article => article.status === activeFilter.value)
})

const getStatusText = (status: string) => {
  const statusMap = {
    published: '已发布',
    draft: '草稿',
    archived: '已归档'
  }
  return statusMap[status as keyof typeof statusMap] || status
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN')
}

const handleCreateArticle = () => {
  console.log('创建文章')
}

const handleEditArticle = (article: Article) => {
  console.log('编辑文章:', article)
}

const handleViewArticle = (article: Article) => {
  console.log('预览文章:', article)
}

const handlePublishArticle = (article: Article) => {
  console.log('发布/取消发布文章:', article)
}

const handleDuplicateArticle = (article: Article) => {
  console.log('复制文章:', article)
}

const handleDeleteArticle = (article: Article) => {
  console.log('删除文章:', article)
}

onMounted(() => {
  appStore.setBreadcrumbs([
    { title: '首页', path: '/' },
    { title: '内容管理', path: '/content' },
    { title: '文章管理', path: '/content/articles' }
  ])
})
</script>

<style scoped>
.articles-page {
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
  gap: 24px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.filter-tabs {
  display: flex;
  gap: 8px;
}

.filter-tab {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-tab:hover {
  background: #f3f4f6;
  color: #374151;
}

.filter-tab.active {
  background: #667eea;
  color: white;
}

.articles-list {
  padding: 20px 0;
}

.article-item {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.article-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.article-cover {
  position: relative;
  width: 200px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-status {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: white;
}

.article-status.published {
  background: #10b981;
}

.article-status.draft {
  background: #f59e0b;
}

.article-status.archived {
  background: #6b7280;
}

.article-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.article-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
}

.article-category {
  font-size: 12px;
  color: #667eea;
  background: #ede9fe;
  padding: 2px 6px;
  border-radius: 4px;
}

.article-date {
  font-size: 12px;
  color: #9ca3af;
}

.article-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.article-summary {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
  margin: 0 0 16px 0;
  flex: 1;
}

.article-stats {
  display: flex;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #9ca3af;
}

.stat-item i {
  font-size: 14px;
}

.article-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-self: flex-start;
}

.icon-add::before { content: '➕'; }
.icon-view::before { content: '👁️'; }
.icon-like::before { content: '❤️'; }
.icon-comment::before { content: '💬'; }
.icon-more::before { content: '⋯'; }

:deep(.danger) {
  color: #ef4444 !important;
}
</style>