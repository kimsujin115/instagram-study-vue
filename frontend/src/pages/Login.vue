<template>
  <div class="loginWrap">
    <div class="instaIntroArea">
      <div class="box">
        <div class="logo">
          <i class="fa-brands fa-instagram"></i>
        </div>
        <div class="fieldSet">
          <input type="text" placeholder="사용자 이름(ID)" v-model="userid">
          <input type="password" placeholder="비밀번호" v-model="password">
          <button class="btn" @click="onLogin">로그인</button>
        </div>
      </div>
      <div class="box">
        <div class="text">
          <span>계정이 없으신가요?</span>
          <router-link to="/" class="btn">가입하기</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const userid = ref('');
    const password = ref('');

    const onLogin = async () => {
      await axios.post('/api/users/login', {
        userid : userid.value,
        password  : password.value
      })
      .then((res) => {
        if(res.data.success == true){
          alert(res.data.message)
        } else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log('에러메세지 : ', err)
      })
    }

    return {
      userid,
      password,
      onLogin,
    }
  }
}
</script>

<style>

</style>