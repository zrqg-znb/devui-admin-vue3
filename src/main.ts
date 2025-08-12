import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import DevUI from 'vue-devui';
import 'vue-devui/style.css';
import '@devui-design/icons/icomoon/devui-icon.css';
import { 
  ThemeServiceInit, 
  infinityTheme, 
  provenceTheme, 
  sweetTheme, 
  deepTheme, 
  galaxyTheme 
} from 'devui-theme';

// 初始化主题服务，包含所有内置主题
const themeService = ThemeServiceInit({
  infinityTheme,
  provenceTheme,
  sweetTheme,
  deepTheme,
  galaxyTheme
}, 'infinityTheme');

// 将主题服务挂载到全局，方便在组件中使用
(window as any).themeService = themeService;

const app = createApp(App)
const pinia = createPinia()

app.use(DevUI)
app.use(pinia)
app.use(router)

app.mount('#app')