import { createRouter, createWebHistory } from 'vue-router'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import Notifications from '../pages/Notifications.vue'
import Myfeed from '../pages/MyFeed.vue'
import store from '../store'

const routes = [
    {path:'/', name:'home', component:Home, meta: { layout:'DefaultLayout', requireAuth:true }},
    {path:'/notifications', name:'notification', component:Notifications, meta: { layout:'DefaultLayout', requireAuth:true }},
    {path:'/myfeed', name:'myfeed', component:Myfeed, meta: { layout:'DefaultLayout', requireAuth:true }},
    {path:'/register', name:'register', component:Register, meta: { layout:'EmptyLayout' }},
    {path:'/login', name:'login', component:Login, meta: { layout:'EmptyLayout' }},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/* navigation guard */
router.beforeEach( (to, from, next) => {
    const currentUser = store.state.user //store에 저장해놓은 현재 유저정보
    const requireAuth = to.matched.some((requireInfo) => requireInfo.meta.requireAuth);

    if (requireAuth && !currentUser) { //회원인증이 필요한 페이지인데 로그인한 유저가 아니면 로그인 페이지로 이동시킴
        next('/login');
    } else {
        next();
    }
})


export default router
