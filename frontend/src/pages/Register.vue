<template>
  <div class="registerWrap">
    <div class="instaIntroArea">
      <div class="box">
        <div class="logo">
          <i class="fa-brands fa-instagram"></i>
        </div>
        <p class="txt">친구들의 사진과 동영상을<br/> 보려면 가입하세요.</p>
        <div class="fieldSet">
          <input type="text" placeholder="이메일" v-model="email">
          <input type="text" placeholder="성명" v-model="username">
          <input type="text" placeholder="사용자 이름(ID)" v-model="userid">
          <input type="password" placeholder="비밀번호" v-model="password">
          <button class="btn" @click="onSignUp">가입</button>
        </div>
      </div>
      <div class="box">
        <div class="text">
          <span>계정이 있으신가요?</span>
          <router-link to="/login" class="btn">로그인</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() { 
    const router = useRouter();
    const userid = ref('');
    const username = ref('');
    const email = ref('');
    const password = ref('');
    
    const onSignUp = async () => {
      if (userid.value === '' || username.value == '' || email.value == '' || password.value == '') {
          alert('아이디, 이름, 이메일, 비밀번호를 모두 입력해 주세요.');
          return;
        }

        await axios.post("/api/users/signUp", {
          userid : userid.value,
          username : username.value,
          email : email.value,
          password : password.value,
          profile_img : '../assets/images/img_profile.png'
        })
        .then((res) => {
          if (res.data.success == true) { //가입성공
            alert(res.data.message)
            router.push('/login'); 
          } else { //가입실패
            alert(res.data.message)
          }
        })
        .catch((err) => {
            console.log('에러메세지 : ', err)
        });
    }

    return {
      userid,
      username,
      email,
      password,
      onSignUp,
    }
  }
}
</script>

<style>

</style>