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
        <li v-for="(post, idx) in posts" :key="post">
            <div class="user">
                <router-link :to="`/profile/${post.userid}`">
                    <div class="profile active">
                        <img :src="`${postProfile[idx]}`" alt="" />
                    </div>
                    <span class="name">{{post.userid}}</span>
                </router-link>
                <span class="date">{{ moment(post.created_at).fromNow() }}</span>
            </div>
            <div class="feedImg">
                <img :src="`http://localhost:3000/${post.image_url}`" alt="" />
            </div>
            <div class="utill">
                <div class="group">
                    <button @click="handleLikes(post)">
                        <i v-if="post.isLiked" class="fas fa-heart"></i>
                        <i v-else class="far fa-heart"></i>
                    </button>
                    <button @click="showCommentModal = true">
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
            <div class="replyInput">
                <input type="text" placeholder="댓글달기.." v-model="comment">
                <button @click="onComments(post)" :class="`${comment ? 'active' : ''}`">입력</button>
            </div>
        </li>
    </ul>

    <!-- 댓글 팝업 -->
    <CommentModal v-if="showCommentModal"></CommentModal>
</template>

<script>
import axios from 'axios';
import { onBeforeMount, ref, computed } from 'vue';
import moment from 'moment'
import 'moment/locale/ko'  // 1분전, 1시간전, 하루전 이렇게 한글로 노출되게
import store from '../store';
import CommentModal from '../components/CommentModal.vue'

export default {
    components : { CommentModal },
    setup() {
        const currentUser = computed(() => store.state.user);
        const posts = ref([]); //게시글
        const postProfile = ref([]); //게시글의 유저 프로필
        const comment = ref('');
        const showCommentModal = ref(false);

        onBeforeMount( async () => {
            try {
                await axios.get('/api/feed/post')
                .then((res) => { 
                    //console.log(res)
                    posts.value = res.data.list;
                    resultPostUser();
                    onPostLiked();
                })
            }catch(err) {
                console.log('에러메세지 : ', err)
            }
        });

        /* 해당 게시글의 유저 정보 가져오기 */
        const resultPostUser = async () => {
            for (let i=0; i < posts.value.length; i++) {
               try {
                    await axios.post('/api/users', {
                        userid : posts.value[i].userid,
                    })
                    .then((user) => {
                        postProfile.value.push(user.data.userid.profile_img)
                    })
               } catch(err) {
                    console.log('게시글 유저 정보 에러메시지 :', err)
                }
            }
        }

        /* 댓글 등록하기 */
        const onComments = async (post) => {
            console.log(post)
            if (!comment.value) {
                alert('댓글을 입력해 주세요.')
            } else {
                try {
                    await axios.post('/api/comments', {
                        userid : currentUser.value.userid,
                        postNo : post.postNo,
                        postuser : post.userid,
                        comment : comment.value,
                    })
                    .then((res) => {
                        console.log(res.data.message);
                        comment.value = '';
                    })
                } catch(err) {
                    console.log('댓글 등록 실패 에러메시지 : ', err )
                }
            }
        }

        /* 로드시 내가 좋아요 누른 게시글 isLiked 유무 체크 함수 */
        const onPostLiked = async () => {
            console.log(posts.value)
            for (let i=0; i < posts.value.length; i++) {
                try {
                    await axios.post('/api/likes', {
                        userid : currentUser.value.userid,
                        postNo : posts.value[i].postNo,
                    })
                    .then((res) => {
                        console.log(res.data.count)
                        if (res.data.count == 0) { //좋아요 누르지 않았으면 0 : false, 눌렀으면 1 : true
                            posts.value[i].isLiked = false 
                        } else {
                            posts.value[i].isLiked = true
                        }
                    })
                }
                catch(err) {
                    console.log('에러메시지 : ', err)
                }
            }
        }

        const handleLikes = async (post) => {
            //console.log(post)
            if (!post.isLiked) { //좋아요 활성화
                try {
                    await axios.post('/api/likes/addLike', {
                        userid : currentUser.value.userid,
                        postNo : post.postNo,
                        postuser : post.userid,
                    })
                    .then((res) => {
                        console.log(res.data.message)
                        post.isLiked = true;
                        post.num_likes = res.data.like_num;
                        //console.log('likes : ', res.data.like_num)
                    })
                }
                catch(err) {
                    console.log('좋아요 활성 에러메시지 : ', err )
                }

            } else { //좋아요 비활성화
                try {
                    await axios.post('/api/likes/deleteLike', {
                        userid : currentUser.value.userid,
                        postNo : post.postNo,
                    })
                    .then((res) => {
                        console.log(res.data.message)
                        post.isLiked = false;
                        post.num_likes = res.data.like_num;
                        //console.log('likes- : ', res.data.like_num)
                    })
                }
                catch(err) {
                    console.log('좋아요 활성 에러메시지 : ', err )
                }
            }
        }

        return {
            currentUser,
            posts,
            postProfile,
            resultPostUser,
            moment,
            comment,
            onComments,
            onPostLiked,
            handleLikes,
            showCommentModal,
        }
    }
}
</script>
