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
                <button class="btnComplete">제출</button>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../store'
import { computed, ref } from 'vue';
import axios from 'axios';

export default{
    setup() {
        const currentUser = computed(() => store.state.user);
        const self_intro = ref('');
        const profile_img = ref('');
        const formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' },
        };

        const onProfleChange = async (event) => {
            const file = event.target.files[0];
            //console.log(file)
            profile_img.value = file;

            if (profile_img.value) {
                formData.append("userid", currentUser.value.userid);
                formData.append("uploadProfile", event.target.files[0]);

                await axios.post('/api/profile', formData, config)
                .then((res) => {
                    console.log(res.data.message)
                    console.log(res.data.profile_img);
                    store.commit("SET_PROFILE", res.data.profile_img);
                    // console.log(currentUser.value)
                })
                .catch((err) => {
                    console.log('에러메세지 : ', err);
                })
            }
        }

        return {
            currentUser,
            self_intro,
            profile_img,
            onProfleChange,
        }
    }
}
</script>