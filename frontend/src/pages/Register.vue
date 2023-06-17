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
          <p class="error" v-if="errText">{{errText}}</p>
          <button :class="`btn ${vaildBool ? 'active' : ''}`" @click="onSignUp">가입</button>
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
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() { 
    const router = useRouter();
    const userid = ref('');
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const vaildBool = ref(false);
    const errText = ref('');

    //유효성 체크
    const setVaildCheck = watchEffect(() => {
      const emailChk = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      const nameChk = /^[가-힣a-zA-Z]{2,20}$/;
      const idChk = /^[a-zA-Z0-9\s_.]{5,}$/;
      const pwChk = /^[A-Za-z0-9]{6,15}$/;

      if (!emailChk.test(email.value) && email.value ) { //이메일 유효성 체크
        errText.value = '이메일 형식에 맞게 입력해 주세요.'
        vaildBool.value = false;
        return;
      } else if (!nameChk.test(username.value) && username.value) { //이름 유효성 체크
        errText.value = '올바른 형식이 아닙니다. 성명은 2자 이상 입력해 주세요.'
        vaildBool.value = false;
        return;
      } else if (!idChk.test(userid.value) && userid.value) { // 아이디 유효성 체크
        errText.value = '아이디는 5자 이상 입력해 주세요. 특수문자는 .과 _ 만 사용 가능합니다.'
        vaildBool.value = false;
        return;
      }else if (!pwChk.test(password.value) && password.value) { //비밀번호 유효성 체크
        errText.value = '비밀번호는 6자 이상 15자 이하로 입력해 주세요.'
        vaildBool.value = false;
        return;
      } else {
        errText.value = '';
        if (email.value && username.value && userid.value && password.value) {
          vaildBool.value = true;
        }
      }
    })

    //가입하기
    const onSignUp = async () => {
      if (userid.value === '' || username.value == '' || email.value == '' || password.value == '') {
        errText.value = '아이디, 이름, 이메일, 비밀번호를 모두 입력해 주세요.'
        //alert('아이디, 이름, 이메일, 비밀번호를 모두 입력해 주세요.');
        return;
      } else {
        await axios.post("/api/users/signUp", {
          userid : userid.value,
          username : username.value,
          email : email.value,
          password : password.value,
          profile_img : 'img_profile.jpg'
        })
        .then((res) => {
          if (res.data.success == true) { //가입성공
            alert(res.data.message);
            router.push('/login'); 
          } else { //가입실패
            errText.value = res.data.message
            vaildBool.value = false;
            //alert(res.data.message)
          }
        })
        .catch((err) => {
            console.log('에러메세지 : ', err)
        });

      }
    }

    return {
      userid,
      username,
      email,
      password,
      errText,
      onSignUp,
      vaildBool,
      setVaildCheck,
    }
  }
}
</script>

<style>

</style>