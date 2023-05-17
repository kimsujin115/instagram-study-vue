import { createRouter, createWebHistory } from 'vue-router'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import Notifications from '../pages/Notifications.vue'
import Myfeed from '../pages/MyFeed.vue'

const routes = [
    {path:'/', name:'home', component:Home, meta: { layout:'DefaultLayout' }},
    {path:'/notifications', name:'notification', component:Notifications, meta: { layout:'DefaultLayout' }},
    {path:'/myfeed', name:'myfeed', component:Myfeed, meta: { layout:'DefaultLayout' }},
    {path:'/register', name:'register', component:Register, meta: { layout:'EmptyLayout' }},
    {path:'/login', name:'login', component:Login, meta: { layout:'EmptyLayout' }},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
