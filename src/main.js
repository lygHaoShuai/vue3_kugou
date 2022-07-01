import { createApp } from 'vue'
import store from './store'
import router from "./router";
import ElementPlus from 'element-plus'

import videoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

import 'element-plus/dist/index.css'

import App from './App.vue'

createApp(App).use(store).use(router).use(ElementPlus).use(videoPlayer).mount('#app')
