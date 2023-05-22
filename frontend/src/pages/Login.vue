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
          <p class="error" v-if="errText">{{errText}}</p>
          <button :class="`btn ${vaildBool ? 'active' : ''}`" @click="onLogin">로그인</button>
        </div>
      </div>
      <div class="box">
        <div class="text">
          <span>계정이 없으신가요?</span>
          <router-link to="/register" class="btn">가입하기</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import axios from 'axios';
import store from '../store'
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const userid = ref('');
    const password = ref('');
    const errText = ref('');
    const vaildBool = ref(false);

    const setWatch = watch(() => {
      if (userid.value && password.value) {
        vaildBool.value = true;
      } else {
        errText.value = '';
        vaildBool.value = false;
      }
    })

    const onLogin = async () => {
      if ( !userid.value || !password.value ) {
        errText.value = '아이디, 비밀번호를 입력해 주세요.'
        return;
      } else {
        await axios.post('/api/users/login', {
          userid : userid.value,
          password  : password.value
        })
        .then((res) => {
          if(res.data.success == true){ //로그인 성공
            alert(res.data.message)
            store.commit("SET_USER", userid) //store에 userid 저장
            console.log(store.state.user)

            router.replace('/');
          } else {
            errText.value = res.data.message
            //alert(res.data.message)
          }
        })
        .catch((err) => {
          console.log('에러메세지 : ', err)
        })
      }
      
    }

    return {
      userid,
      password,
      onLogin,
      errText,
      vaildBool,
      setWatch
    }
  }
}
</script>

<style>

</style>