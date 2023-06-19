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
                        <li>
                            <router-link to="/">
                                <i class="icon fas fa-house"></i>
                                <span>홈</span>
                            </router-link>
                        </li>
                        <li>
                            <a href="#">
                                <i class="icon fas fa-magnifying-glass"></i>
                                <span>검색</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="icon far fa-paper-plane"></i>
                                <span>메세지</span>
                            </a>
                        </li>
                        <li>
                            <router-link to="/notifications">
                                <i class="icon fa-regular fa-heart"></i>
                                <span>알림</span>
                            </router-link>
                        </li>
                        <li>
                            <a href="javascript:;" @click="showWriteModal = true">
                                <i class="icon fa-regular fa-square-plus"></i>
                                <span>만들기</span>
                            </a>
                        </li>
                        <li>
                            <router-link to="/myfeed">
                                <div class="profile">
                                    <img :src="currentUser.profile_img" :alt="`${currentUser.userid}의 프로필`">
                                </div>
                                <span>프로필</span>
                            </router-link>
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
                <router-view></router-view>
            </div>
        </div>
    </div>

    <!-- 게시물 등록 팝업 -->
    <NewWriteModal v-if="showWriteModal" @close-modal="showWriteModal = false"></NewWriteModal>
</template>

<script>
import { ref, computed} from 'vue';
import { useRouter } from 'vue-router';
import store from '../store';
import NewWriteModal from '../components/NewWriteModal.vue';

export default {
    components: { NewWriteModal },
    setup() {
        const router = useRouter();
        const showWriteModal = ref(false);
        const currentUser = computed(() => store.state.user);

        const onLogout = () => {
            store.commit("SET_USER", null);
            router.push('/login');
            console.log(store.state.user);
        }
        
        return {
            router,
            onLogout,
            showWriteModal,
            currentUser,
        }
    }
}
</script>