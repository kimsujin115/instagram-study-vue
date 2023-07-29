import { createApp } from 'vue'
import App from './App.vue'
// import axios from 'axios'
// import './assets/css/style.css'
import router from './router'

const app = createApp(App).use(router).use(router);
// app.config.globalProperties.$Axios = axios; //전역변수로 사용하려고 등록

app.use(router).mount('#app');
