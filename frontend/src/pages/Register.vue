<template>
  <div class="registerWrap">
    <div class="instaIntroArea">
      <div class="box">
        <div class="logo">
          <i class="fa-brands fa-instagram"></i>
        </div>
        <p class="txt">친구들의 사진과 동영상을<br/> 보려면 가입하세요.</p>
        <div class="fieldSet">
          <input type="text" placeholder="이메일" >
          <input type="text" placeholder="성명">
          <input type="text" placeholder="사용자 이름(ID)">
          <input type="password" placeholder="비밀번호">
          <button class="btn" @click="onSignUp">가입</button>
        </div>
      </div>
      <div class="box">
        <div class="text">
          <span>계정이 있으신가요?</span>
          <button class="btn">로그인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    methods : {
        onSignUp : async () => {
          await axios.get("/api/users/signUp")
          .then((res) => {
            console.log("응답 데이터 : " , res.data);
          })
          .catch((err) => {
              console.log('err.message : ', err.message)
          });
        }
    },  
    data() {
      return {
        user : {
          userid : '',
          username : '',
          email : '',
          password : '',
        }
      }
    }

}
</script>

<style>

</style>