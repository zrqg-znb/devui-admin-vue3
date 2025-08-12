<template>
  <div class="videos-page">
    <div class="page-header">
      <h1 class="page-title">视频管理</h1>
      <p class="page-description">管理网站的所有视频资源</p>
    </div>
    
    <div class="page-content">
      <d-card class="content-card">
        <template #header>
          <div class="card-header">
            <div class="header-left">
              <span class="card-title">视频库</span>
              <div class="filter-controls">
                <d-select v-model="statusFilter" size="sm" style="width: 120px;">
                  <d-option value="all">全部状态</d-option>
                  <d-option value="processing">处理中</d-option>
                  <d-option value="ready">就绪</d-option>
                  <d-option value="error">错误</d-option>
                </d-select>
              </div>
            </div>
            <div class="header-right">
              <d-input 
                v-model="searchQuery"
                placeholder="搜索视频..."
                size="sm"
                style="width: 200px; margin-right: 12px;"
              >
                <template #prefix>
                  <i class="icon-search"></i>
                </template>
              </d-input>
              <d-button type="primary" @click="handleUploadVideo">
                <i class="icon-upload"></i>
                上传视频
              </d-button>
            </div>
          </div>
        </template>
        
        <div class="videos-list">
          <div 
            v-for="video in filteredVideos" 
            :key="video.id" 
            class="video-item"
          >
            <div class="video-thumbnail">
              <img :src="video.thumbnail" :alt="video.title" />
              <div class="video-duration">{{ formatDuration(video.duration) }}</div>
              <div class="video-status" :class="video.status">
                <i :class="getStatusIcon(video.status)"></i>
              </div>
              <div class="play-overlay" @click="handlePlayVideo(video)">
                <i class="icon-play"></i>
              </div>
            </div>
            
            <div class="video-content">
              <div class="video-header">
                <h3 class="video-title">{{ video.title }}</h3>
                <div class="video-actions">
                  <d-dropdown>
                    <d-button size="sm">
                      <i class="icon-more"></i>
                    </d-button>
                    <template #menu>
                      <d-dropdown-item @click="handleEditVideo(video)">
                        编辑信息
                      </d-dropdown-item>
                      <d-dropdown-item @click="handleDownloadVideo(video)">
                        下载视频
                      </d-dropdown-item>
                      <d-dropdown-item @click="handleGenerateEmbed(video)">
                        生成嵌入代码
                      </d-dropdown-item>
                      <d-dropdown-item @click="handleDeleteVideo(video)" class="danger">
                        删除视频
                      </d-dropdown-item>
                    </template>
                  </d-dropdown>
                </div>
              </div>
              
              <p class="video-description">{{ video.description }}</p>
              
              <div class="video-meta">
                <div class="meta-row">
                  <span class="meta-item">
                    <i class="icon-file"></i>
                    {{ formatFileSize(video.size) }}
                  </span>
                  <span class="meta-item">
                    <i class="icon-resolution"></i>
                    {{ video.resolution }}
                  </span>
                  <span class="meta-item">
                    <i class="icon-format"></i>
                    {{ video.format.toUpperCase() }}
                  </span>
                </div>
                
                <div class="meta-row">
                  <span class="meta-item">
                    <i class="icon-calendar"></i>
                    {{ formatDate(video.uploadedAt) }}
                  </span>
                  <span class="meta-item">
                    <i class="icon-view"></i>
                    {{ video.views }} 次播放
                  </span>
                </div>
              </div>
              
              <div class="video-tags">
                <span 
                  v-for="tag in video.tags" 
                  :key="tag" 
                  class="video-tag"
                >
                  {{ tag }}
                </span>
              </div>
              
              <div v-if="video.status === 'processing'" class="processing-progress">
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    :style="{ width: video.processingProgress + '%' }"
                  ></div>
                </div>
                <span class="progress-text">处理中... {{ video.processingProgress }}%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="filteredVideos.length === 0" class="empty-state">
          <div class="empty-icon">
            <i class="icon-empty"></i>
          </div>
          <h3>暂无视频</h3>
          <p>{{ searchQuery ? '没有找到匹配的视频' : '开始上传您的第一个视频' }}</p>
          <d-button v-if="!searchQuery" type="primary" @click="handleUploadVideo">
            上传视频
          </d-button>
        </div>
      </d-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '../../../stores/app'

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: number
  size: number
  resolution: string
  format: string
  status: 'processing' | 'ready' | 'error'
  processingProgress?: number
  uploadedAt: string
  views: number
  tags: string[]
}

const appStore = useAppStore()

const searchQuery = ref('')
const statusFilter = ref('all')

const videos = ref<Video[]>([
  {
    id: '1',
    title: '产品介绍视频',
    description: '详细介绍我们最新产品的功能特性和使用方法，帮助用户快速上手。',
    thumbnail: 'https://picsum.photos/400/225?random=1',
    duration: 180,
    size: 52428800,
    resolution: '1920x1080',
    format: 'mp4',
    status: 'ready',
    uploadedAt: '2024-01-15',
    views: 1250,
    tags: ['产品', '介绍', '教程']
  },
  {
    id: '2',
    title: '公司宣传片',
    description: '展示公司文化、团队风采和发展历程的宣传视频。',
    thumbnail: 'https://picsum.photos/400/225?random=2',
    duration: 120,
    size: 41943040,
    resolution: '1920x1080',
    format: 'mp4',
    status: 'processing',
    processingProgress: 65,
    uploadedAt: '2024-01-14',
    views: 0,
    tags: ['宣传', '公司', '文化']
  },
  {
    id: '3',
    title: '技术分享会议录像',
    description: '记录了最新技术分享会议的完整内容，包含多个技术主题的深度讲解。',
    thumbnail: 'https://picsum.photos/400/225?random=3',
    duration: 3600,
    size: 1073741824,
    resolution: '1280x720',
    format: 'mp4',
    status: 'ready',
    uploadedAt: '2024-01-13',
    views: 890,
    tags: ['技术', '分享', '会议']
  },
  {
    id: '4',
    title: '用户操作指南',
    description: '详细的用户操作指南视频，涵盖系统的各个功能模块。',
    thumbnail: 'https://picsum.photos/400/225?random=4',
    duration: 450,
    size: 83886080,
    resolution: '1920x1080',
    format: 'mp4',
    status: 'error',
    uploadedAt: '2024-01-12',
    views: 0,
    tags: ['指南', '操作', '帮助']
  }
])

const filteredVideos = computed(() => {
  let result = videos.value
  
  if (statusFilter.value !== 'all') {
    result = result.filter(video => video.status === statusFilter.value)
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(video => 
      video.title.toLowerCase().includes(query) ||
      video.description.toLowerCase().includes(query) ||
      video.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  return result
})

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

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

const getStatusIcon = (status: string) => {
  const iconMap = {
    processing: 'icon-processing',
    ready: 'icon-ready',
    error: 'icon-error'
  }
  return iconMap[status as keyof typeof iconMap] || 'icon-unknown'
}

const handleUploadVideo = () => {
  console.log('上传视频')
}

const handlePlayVideo = (video: Video) => {
  console.log('播放视频:', video)
}

const handleEditVideo = (video: Video) => {
  console.log('编辑视频:', video)
}

const handleDownloadVideo = (video: Video) => {
  console.log('下载视频:', video)
}

const handleGenerateEmbed = (video: Video) => {
  console.log('生成嵌入代码:', video)
}

const handleDeleteVideo = (video: Video) => {
  console.log('删除视频:', video)
}

onMounted(() => {
  appStore.setBreadcrumbs([
    { title: '首页', path: '/' },
    { title: '内容管理', path: '/content' },
    { title: '媒体管理', path: '/content/media' },
    { title: '视频管理', path: '/content/media/videos' }
  ])
})
</script>

<style scoped>
.videos-page {
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

.videos-list {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.video-item {
  display: flex;
  gap: 20px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.video-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.video-thumbnail {
  position: relative;
  width: 300px;
  height: 169px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.video-status {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
}

.video-status.processing {
  background: #f59e0b;
}

.video-status.ready {
  background: #10b981;
}

.video-status.error {
  background: #ef4444;
}

.play-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-thumbnail:hover .play-overlay {
  opacity: 1;
}

.play-overlay i {
  font-size: 24px;
  color: white;
  margin-left: 4px;
}

.video-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.video-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.video-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.4;
}

.video-description {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
  margin: 0 0 16px 0;
}

.video-meta {
  margin-bottom: 16px;
}

.meta-row {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
}

.meta-row:last-child {
  margin-bottom: 0;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #9ca3af;
}

.meta-item i {
  font-size: 14px;
}

.video-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.video-tag {
  font-size: 11px;
  color: #667eea;
  background: #ede9fe;
  padding: 2px 6px;
  border-radius: 4px;
}

.processing-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 12px;
  color: #6b7280;
  white-space: nowrap;
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

.icon-search::before { content: '🔍'; }
.icon-upload::before { content: '⬆️'; }
.icon-play::before { content: '▶️'; }
.icon-more::before { content: '⋯'; }
.icon-file::before { content: '📁'; }
.icon-resolution::before { content: '📐'; }
.icon-format::before { content: '🎬'; }
.icon-calendar::before { content: '📅'; }
.icon-view::before { content: '👁️'; }
.icon-processing::before { content: '⏳'; }
.icon-ready::before { content: '✅'; }
.icon-error::before { content: '❌'; }
.icon-empty::before { content: '🎥'; }

:deep(.danger) {
  color: #ef4444 !important;
}
</style>