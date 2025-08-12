<template>
  <div class="images-page">
    <div class="page-header">
      <h1 class="page-title">图片管理</h1>
      <p class="page-description">管理网站的所有图片资源</p>
    </div>
    
    <div class="page-content">
      <d-card class="content-card">
        <template #header>
          <div class="card-header">
            <div class="header-left">
              <span class="card-title">图片库</span>
              <div class="view-controls">
                <d-button-group>
                  <d-button 
                    :type="viewMode === 'grid' ? 'primary' : 'default'"
                    size="sm"
                    @click="viewMode = 'grid'"
                  >
                    <i class="icon-grid"></i>
                  </d-button>
                  <d-button 
                    :type="viewMode === 'list' ? 'primary' : 'default'"
                    size="sm"
                    @click="viewMode = 'list'"
                  >
                    <i class="icon-list"></i>
                  </d-button>
                </d-button-group>
              </div>
            </div>
            <div class="header-right">
              <d-input 
                v-model="searchQuery"
                placeholder="搜索图片..."
                size="sm"
                style="width: 200px; margin-right: 12px;"
              >
                <template #prefix>
                  <i class="icon-search"></i>
                </template>
              </d-input>
              <d-button type="primary" @click="handleUploadImage">
                <i class="icon-upload"></i>
                上传图片
              </d-button>
            </div>
          </div>
        </template>
        
        <div class="images-container" :class="viewMode">
          <div 
            v-for="image in filteredImages" 
            :key="image.id" 
            class="image-item"
            @click="handleSelectImage(image)"
          >
            <div class="image-preview">
              <img :src="image.url" :alt="image.name" />
              <div class="image-overlay">
                <div class="overlay-actions">
                  <d-button size="sm" @click.stop="handlePreviewImage(image)">
                    <i class="icon-eye"></i>
                  </d-button>
                  <d-button size="sm" @click.stop="handleDownloadImage(image)">
                    <i class="icon-download"></i>
                  </d-button>
                  <d-button size="sm" type="danger" @click.stop="handleDeleteImage(image)">
                    <i class="icon-delete"></i>
                  </d-button>
                </div>
              </div>
            </div>
            
            <div class="image-info">
              <h4 class="image-name">{{ image.name }}</h4>
              <div class="image-meta">
                <span class="image-size">{{ formatFileSize(image.size) }}</span>
                <span class="image-dimensions">{{ image.width }}×{{ image.height }}</span>
                <span class="image-date">{{ formatDate(image.uploadedAt) }}</span>
              </div>
              <div class="image-tags">
                <span 
                  v-for="tag in image.tags" 
                  :key="tag" 
                  class="image-tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="filteredImages.length === 0" class="empty-state">
          <div class="empty-icon">
            <i class="icon-empty"></i>
          </div>
          <h3>暂无图片</h3>
          <p>{{ searchQuery ? '没有找到匹配的图片' : '开始上传您的第一张图片' }}</p>
          <d-button v-if="!searchQuery" type="primary" @click="handleUploadImage">
            上传图片
          </d-button>
        </div>
      </d-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '../../../stores/app'

interface Image {
  id: string
  name: string
  url: string
  size: number
  width: number
  height: number
  uploadedAt: string
  tags: string[]
}

const appStore = useAppStore()

const viewMode = ref<'grid' | 'list'>('grid')
const searchQuery = ref('')

const images = ref<Image[]>([
  {
    id: '1',
    name: 'hero-banner.jpg',
    url: 'https://picsum.photos/800/600?random=1',
    size: 245760,
    width: 800,
    height: 600,
    uploadedAt: '2024-01-15',
    tags: ['banner', 'hero', 'homepage']
  },
  {
    id: '2',
    name: 'product-showcase.png',
    url: 'https://picsum.photos/600/400?random=2',
    size: 189440,
    width: 600,
    height: 400,
    uploadedAt: '2024-01-14',
    tags: ['product', 'showcase']
  },
  {
    id: '3',
    name: 'team-photo.jpg',
    url: 'https://picsum.photos/1200/800?random=3',
    size: 512000,
    width: 1200,
    height: 800,
    uploadedAt: '2024-01-13',
    tags: ['team', 'about', 'people']
  },
  {
    id: '4',
    name: 'blog-cover.jpg',
    url: 'https://picsum.photos/900/500?random=4',
    size: 320000,
    width: 900,
    height: 500,
    uploadedAt: '2024-01-12',
    tags: ['blog', 'cover', 'article']
  },
  {
    id: '5',
    name: 'icon-set.svg',
    url: 'https://picsum.photos/400/400?random=5',
    size: 15360,
    width: 400,
    height: 400,
    uploadedAt: '2024-01-11',
    tags: ['icon', 'svg', 'ui']
  },
  {
    id: '6',
    name: 'background-pattern.png',
    url: 'https://picsum.photos/1920/1080?random=6',
    size: 768000,
    width: 1920,
    height: 1080,
    uploadedAt: '2024-01-10',
    tags: ['background', 'pattern', 'texture']
  }
])

const filteredImages = computed(() => {
  if (!searchQuery.value) {
    return images.value
  }
  
  const query = searchQuery.value.toLowerCase()
  return images.value.filter(image => 
    image.name.toLowerCase().includes(query) ||
    image.tags.some(tag => tag.toLowerCase().includes(query))
  )
})

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN')
}

const handleUploadImage = () => {
  console.log('上传图片')
}

const handleSelectImage = (image: Image) => {
  console.log('选择图片:', image)
}

const handlePreviewImage = (image: Image) => {
  console.log('预览图片:', image)
}

const handleDownloadImage = (image: Image) => {
  console.log('下载图片:', image)
}

const handleDeleteImage = (image: Image) => {
  console.log('删除图片:', image)
}

onMounted(() => {
  appStore.setBreadcrumbs([
    { title: '首页', path: '/' },
    { title: '内容管理', path: '/content' },
    { title: '媒体管理', path: '/content/media' },
    { title: '图片管理', path: '/content/media/images' }
  ])
})
</script>

<style scoped>
.images-page {
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
  gap: 20px;
}

.header-right {
  display: flex;
  align-items: center;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.images-container {
  padding: 20px 0;
}

.images-container.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.images-container.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.image-item {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.image-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.grid .image-item {
  display: flex;
  flex-direction: column;
}

.list .image-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
}

.image-preview {
  position: relative;
  overflow: hidden;
}

.grid .image-preview {
  height: 200px;
}

.list .image-preview {
  width: 120px;
  height: 80px;
  border-radius: 8px;
  margin-right: 16px;
  flex-shrink: 0;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-item:hover .image-preview img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-item:hover .image-overlay {
  opacity: 1;
}

.overlay-actions {
  display: flex;
  gap: 8px;
}

.image-info {
  padding: 16px;
  flex: 1;
}

.list .image-info {
  padding: 0;
}

.image-name {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
  word-break: break-all;
}

.image-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.image-size,
.image-dimensions,
.image-date {
  font-size: 12px;
  color: #9ca3af;
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
}

.image-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.image-tag {
  font-size: 11px;
  color: #667eea;
  background: #ede9fe;
  padding: 2px 6px;
  border-radius: 4px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 18px;
  margin: 0 0 8px 0;
  color: #374151;
}

.empty-state p {
  font-size: 14px;
  margin: 0 0 20px 0;
}

.icon-grid::before { content: '⊞'; }
.icon-list::before { content: '☰'; }
.icon-search::before { content: '🔍'; }
.icon-upload::before { content: '⬆️'; }
.icon-eye::before { content: '👁️'; }
.icon-download::before { content: '⬇️'; }
.icon-delete::before { content: '🗑️'; }
.icon-empty::before { content: '🖼️'; }
</style>