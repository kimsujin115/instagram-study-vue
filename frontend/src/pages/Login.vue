<template>
  <div class="loginWrap">
    <div class="instaIntroArea">
      <div class="box">
        <div class="logo">
          <i class="fa-brands fa-instagram"></i>
        </div>
        <div class="fieldSet">
          <input type="text" placeholder="사용자 이름 또는 이메일">
          <input type="password" placeholder="비밀번호">
          <button class="btn">로그인</button>
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
export default {

}
</script>

<style>

</style>