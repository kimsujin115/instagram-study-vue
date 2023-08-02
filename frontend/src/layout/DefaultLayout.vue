<template>
    <div class="layoutWrap">
        <!-- left side -->
        <div class="sideMenu">
            <div class="menuArea">
                <h1 class="logo">
                    <i class="fa-brands fa-instagram"></i>
                </h1>
                <nav>
                    <ul>
                        <li v-for="hash in routeList" :key="hash">
                            <router-link v-if="hash.name != 'new'" :to="hash.path" :class="`${router.currentRoute.value.name == hash.name ? 'active' : ''}`">
                                <div v-if="hash.name == 'profile'" class="profile">
                                    <img :src="currentUser.profile_img" :alt="`${currentUser.userid}의 프로필`">
                                </div>
                                <i v-else :class="`${hash.icon}`"></i>
                                <span>{{ hash.title }}</span>
                            </router-link>
                            
                            <a v-else href="javascript:;" @click="showWriteModal = true">
                                <i :class="`${hash.icon}`"></i>
                                <span>{{ hash.title }}</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="etcArea">
                <button class="logout" @click="onLogout">
                    <i class="icon fas fa-arrow-right-from-bracket"></i>
                    <span>로그아웃</span>
                </button>
            </div>
        </div>

        <!-- main section -->
        <div class="contentWrap">
            <!-- innerCont -->
            <div class="innerCont">
                <!-- content router-view -->
                <!-- :key="route.fullPath" 같은 path(같은 컴포넌트) 호출 할 떄 리로드 시킴. 즉, 현재 페이지 갱신 시킴 -->
                <router-view :key="route.fullPath"></router-view> 
            </div>
        </div>
    </div>

    <!-- 게시물 등록 팝업 -->
    <NewWriteModal v-if="showWriteModal" @close-modal="showWriteModal = false"></NewWriteModal>
</template>

<script>
import { ref, computed, onBeforeMount} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import store from '../store';
import NewWriteModal from '../components/NewWriteModal.vue';

export default {
    components: { NewWriteModal },
    setup() {
        const router = useRouter();
        const route = useRoute();
        const showWriteModal = ref(false);
        const currentUser = computed(() => store.state.user);
        const routeList = ref([]);

        onBeforeMount(() => {
            routeList.value = router.options.routes.filter(router => router.meta.isMenu == true);
            
            // console.log(router.currentRoute.value.name)
            // console.log(route.name)
        })

        const onLogout = () => {
            store.commit("SET_USER", null);
            router.push('/login');
            console.log(store.state.user);
        }
        
        return {
            router,
            route,
            onLogout,
            showWriteModal,
            currentUser,
            routeList,
        }
    }
}
</script>