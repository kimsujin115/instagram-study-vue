<template>
  <div class="mypageWrap">
    <!-- profile -->
    <div class="profile">
      <div class="img">
        <img :src="currentUser.profile_img" :alt="`${currentUser.userid}의 프로필`" />
      </div>
      <!-- info -->
      <div class="myinfo">
        <div class="user">
          <span class="userid">{{ currentUser.userid }}</span>
          <button>프로필 편집</button>
        </div>
        <div class="nums">
          <span>게시글<em>100</em></span>
          <span>팔로워<em>10</em></span>
          <span>팔로우<em>10</em></span>
        </div>
        <p class="name">{{ currentUser.name}}</p>
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

export default {
  setup() {
    const currentUser = computed(() => store.state.user);
    const feeds = ref([]);

    onBeforeMount( async () => {
        await axios.post('/api/feed/myfeed', {
          userid : currentUser.value.userid,
        })
        .then((res) => { 
            //console.log(res)
            feeds.value = res.data.myfeed;
            console.log(feeds.value)
        })
        .catch((err) => {
            console.log('에러메세지 : ', err)
        });
      });

    return {
      currentUser,
      feeds,
    }
  }
}
</script>

<style>

</style>