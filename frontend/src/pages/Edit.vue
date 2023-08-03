<template>
    <h3 class="pageTit">프로필 편집</h3>
    <div class="editWrap">
        <div class="row">
            <em class="tit">프로필</em>
            <div class="profile">
                <div class="img">
                    <img :src="currentUser.profile_img" :alt="`${currentUser.userid}의 프로필`">
                </div>
                <div class="user">
                    <p class="uid">{{currentUser.userid}}</p>
                    <label for="picFile" class="profleChange">
                        <input type="file" id="picFile" accept="image/*" @change="onProfleChange">
                        <span>프로필 사진 바꾸기</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="row">
            <em class="tit">소개</em>
            <div class="intro">
                <textarea placeholder="소개글을 입력하세요." v-model="self_intro"></textarea>
                <p class="numchk">0/100</p>
                <button :class="`btnComplete ${self_intro ? 'active' : ''}`" @click="onEditSelf">제출</button>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../store'
import { computed, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default{
    setup() {
        const currentUser = computed(() => store.state.user);
        const self_intro = ref('');
        const profile_img = ref(null);
        const router = useRouter();
        const formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' },
        };

        const onProfleChange = async (event) => {
            const file = event.target.files[0];
            //console.log(file)
            profile_img.value = file;

            if (profile_img.value) {
                try {
                    formData.append("userid", currentUser.value.userid);
                    formData.append("uploadProfile", event.target.files[0]);

                    await axios.post('/api/profile', formData, config)
                    .then((res) => {
                        console.log(res.data.message)
                        console.log(res.data.profile); // profile_img : profile 이미지 주소 객체 형태로 노출
                        store.commit("SET_PROFILE", res.data.profile.profile_img);
                        router.go('/');
                    })
                } catch(err) {
                    console.log('에러메세지 : ', err);
                    alert('다시 등록해 주세요.')
                    store.commit("SET_PROFILE", './img_profile.jpg');
                }
            }
        }

        /* 프로필 소개글 등록/수정 */
        const onEditSelf = async () => {
            try {
                await axios.post('/api/profile/self', {
                    userid : currentUser.value.userid,
                    self : self_intro.value
                })
                .then((res) => {
                    console.log(res.data.message);
                    self_intro.value = '';
                })
            } catch(err) {
                console.log('프로필 소개 등록 에러메시지 : ', err);
            }
        }

        return {
            currentUser,
            self_intro,
            profile_img,
            onProfleChange,
            router,
            onEditSelf,
        }
    }
}
</script>