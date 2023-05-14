import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import './assets/css/style.css'

const app = createApp(App);
app.config.globalProperties.$Axios = axios; //전역변수로 사용하려고 등록

app.mount('#app');
