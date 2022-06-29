import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css' // 三方重置样式包
import '@/assets/styles/common.less' // 重置样式

import Fine from '@/components' // 自己的Fine-UI组件库并且注册use(Fine)

createApp(App).use(store).use(router).use(Fine).mount('#app')
