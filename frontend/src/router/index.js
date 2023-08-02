import { createRouter, createWebHistory } from 'vue-router'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import Notifications from '../pages/Notifications.vue'
import Profile from '../pages/Profile.vue'
import Edit from '../pages/Edit.vue'
import store from '../store'

const routes = [
    {path:'/', name:'home', title:'홈', component:Home, icon:'icon fas fa-house', meta: {isMenu:true, layout:'DefaultLayout', requireAuth:true }},
    {path:'/', name:'search', title:'검색', component:Home, icon:'icon fas fa-magnifying-glass', meta: {isMenu:true, layout:'DefaultLayout', requireAuth:true }},
    {path:'/', name:'message', title:'메시지', component:Home, icon:'icon far fa-paper-plane', meta: {isMenu:true, layout:'DefaultLayout', requireAuth:true }},
    {path:'/notifications', name:'notification', title:'알림', icon:'icon fa-regular fa-heart', component:Notifications, meta: {isMenu:true, layout:'DefaultLayout', requireAuth:true }},
    {path:'/', name:'new', title:'만들기', component:Edit, icon:'icon fa-regular fa-square-plus', meta: {isMenu:true, layout:'DefaultLayout', requireAuth:true }},
    {path:'/profile', name:'profile', title:'프로필', component:Profile, meta: {isMenu:true, layout:'DefaultLayout', requireAuth:true }},
    {path:'/profile/:userid', component:Profile, meta: { layout:'DefaultLayout', requireAuth:true }},
    {path:'/edit', name:'edit', component:Edit, meta: {isMenu:false, layout:'DefaultLayout', requireAuth:true }},
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
