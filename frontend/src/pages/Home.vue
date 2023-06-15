<template>
  <!-- storyList -->
  <ul class="storyList">
        <li v-for="story in 10" :key="story" class="active">
            <button>
                <div class="img"><img src="http://picsum.photos/200" alt="" /></div>
                <span class="user">user.instarid</span>
            </button>
        </li>
    </ul>
    <!-- feedList -->
    <ul class="feedList">
        <li v-for="post in posts" :key="post">
            <div class="user">
                <div class="profile active">
                    <img src="http://picsum.photos/100" alt="" />
                </div>
                <span class="name">{{post.userid}}</span>
                <span class="date">{{ moment(post.created_at).fromNow() }}</span>
            </div>
            <div class="feedImg">
                <img :src="`http://localhost:3000/${post.image_url}`" alt="" />
            </div>
            <div class="utill">
                <div class="group">
                    <button>
                        <i class="far fa-heart"></i>
                    </button>
                    <button>
                        <i class="far fa-comment"></i>
                    </button>
                    <button>
                        <i class="icon far fa-paper-plane"></i>
                    </button>
                </div>
                <button>
                    <i class="fa-regular fa-bookmark"></i>
                </button>
            </div>
            <p class="like_num">좋아요 {{post.num_likes}}</p>
            <div class="feedText">
                <span class="writer">{{ post.userid }}</span>
                <span class="text">{{post.content}}</span>
                <button class="btnMore">...더 보기</button>
            </div>
        </li>
    </ul>
</template>

<script>
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
import moment from 'moment'
import 'moment/locale/ko'  // 1분전, 1시간전, 하루전 이렇게 한글로 노출되게

export default {
    setup() {
        const posts = ref([]);

        onBeforeMount( async () => {
            await axios.post('/api/feed/post')
            .then((res) => { 
                //console.log(res)
                posts.value = res.data.list
            })
            .catch((err) => {
                console.log('에러메세지 : ', err)
            });
        }) 

        return {
            posts,
            moment,
        }
    }
}
</script>
