import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import './assets/css/style.css'

createApp(App).mount('#app')

createApp.prototype.$http = axios
