import { createRouter, createWebHistory } from 'vue-router'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'

const routes = [
    {path:'/', name:'register', component:Register},
    {path:'/login', name:'login', component:Login},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
