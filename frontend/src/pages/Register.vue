<template>
  <div class="registerWrap">
    <div class="instaIntroArea">
      <div class="box">
        <div class="logo">
          <i class="fa-brands fa-instagram"></i>
        </div>
        <p class="txt">친구들의 사진과 동영상을<br/> 보려면 가입하세요.</p>
        <div class="fieldSet">
          <input type="text" placeholder="이메일" v-model="users.email">
          <input type="text" placeholder="성명" v-model="users.name">
          <input type="text" placeholder="사용자 이름(ID)" v-model="users.userid">
          <input type="password" placeholder="비밀번호" v-model="users.password">
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
export default {
  data() {
    return {
      users : {
        userid : '',
        name : '',
        email : '',
        password : '',
        profile_img : '../assets/images/img_profile.png',
      }
    }
  },
  methods : {
    onSignUp : async function() {
        await this.$Axios.post("/api/users/signUp", {
          users : this.users,
        })
        .then((res) => {
          console.log('응답메시지 : ' , res)
          if (res.data.success == true) {
            console.log(res.data.message)
          } else {
            console.log(res.data.message)
          }
        })
        .catch((err) => {
            console.log('err.message : ', err)
        });
      }
    },
}
</script>

<style>

</style>