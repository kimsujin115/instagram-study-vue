<template>
  <div class="mypageWrap">
    <!-- profile -->
    <div class="profile">
      <div class="img">
        <img :src="profileUser.profile_img" :alt="`${profileUser.userid}의 프로필`" />
      </div>
      <!-- info -->
      <div class="myinfo">
        <div class="user">
          <span class="userid">{{ profileUser.userid }}</span>
          <router-link to="/edit" class="btnEdit">프로필 편집</router-link>
        </div>
        <div class="nums">
          <span>게시글<em>{{feeds.length}}</em></span>
          <span>팔로워<em>{{ profileUser.follower_num }}</em></span>
          <span>팔로우<em>{{ profileUser.following_num }}</em></span>
        </div>
        <p class="name" v-if="profileUser.self">{{ profileUser.self}}</p>
        <button v-if="currentUser.userid != profileUser.userid" type="button" class="btnFollow" @click="onFollow">팔로우</button>
      </div>
    </div>

    <!-- myfeed -->
    <div class="myfeed">
      <ul>
        <li v-for="feed in feeds" :key="feed">
          <a href="#">
            <img :src="`http://localhost:3000/${feed.image_url}`" alt="" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { onBeforeMount, computed, ref } from 'vue';
import store from '../store'
import { useRoute } from 'vue-router';

export default {
  setup() {
    const currentUser = computed(() => store.state.user);
    const profileUser = ref('');
    const feeds = ref([]);
    const route = useRoute();

    // console.log('profileUser', profileUser)
    onBeforeMount( async () => {
      const profileUID = route.params.userid ?? currentUser.value.userid; //params값이 null이면 현재 로그인 된 유저
      // console.log('profileUID : ', route.params.userid)

      /* 프로필 유저 가져오기 */
      try {
        await axios.post('/api/users', {
          userid : profileUID,
        })
        .then((res) => { 
            //console.log(res)
            profileUser.value = res.data.userid;
        })
      } catch(err) {
          console.log('에러메세지 : ', err)
      }

      /* 해당 유저의 피드 불러오기 */
      try {
        await axios.post('/api/feed/profile', {
          userid : profileUID,
        })
        .then((res) => { 
            //console.log(res)
            feeds.value = res.data.profile;
            //console.log(feeds.value)
        })
      } catch(err) {
          console.log('에러메세지 : ', err)
      }

      /* 팔로잉 여부 확인 */
      if (profileUser.value.userid != currentUser.value.userid) {
        try {
          await axios.post('/api/follow', {
            'userid' : currentUser.value.userid,
            'followid' : profileUser.value.userid,
          })
          .then((res) => { 
              if (res.data.list.length == 0) {
                document.querySelector('.btnFollow').classList.remove('active')
              } else {
                document.querySelector('.btnFollow').classList.add('active')
              }
          })
        } catch(err) {
            console.log('팔로잉 에러메세지 : ', err)
        }
      }
    });

    
    /* 팔로우 */
    const onFollow = async () => {
      if (!document.querySelector('.btnFollow').classList.contains('active')) {
        /* 팔로우 */
        try {
          await axios.post('/api/follow/follow', {
            userid : currentUser.value.userid,
            followid : profileUser.value.userid,
          })
          .then((res) => {
            console.log(res.data.message);
            profileUser.value.follower_num = res.data.profileUser.follower_num; // 변경된 팔로우 수
            document.querySelector('.btnFollow').classList.add('active');
          })
        } catch(err) {
          console.log('팔로우 에러메시지 : ', err)
        }
      } else {
        /* 언팔로우 */
        try {
          await axios.post('/api/follow/unfollow', {
            userid : currentUser.value.userid,
            followid : profileUser.value.userid,
          })
          .then((res) => {
            console.log(res.data.message);
            profileUser.value.follower_num = res.data.profileUser.follower_num; // 변경된 팔로우 수
            document.querySelector('.btnFollow').classList.remove('active');
          })
        } catch(err) {
          console.log('언팔로우 에러메시지 : ', err)
        }
      }
    }

    return {
      currentUser,
      profileUser,
      feeds,
      onFollow,
    }
  }
}
</script>

<style>

</style>