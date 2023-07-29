<template>
    <div class="modalPopup commentPopup">
        <div class="dim" @click="$emit('close-modal')"></div>
        <!-- popWrap -->
        <div class="popWrap">
            <!-- popHead -->
            <div class="popHead">
                <h3>댓글</h3>
                <button class="btnClose" @click="$emit('close-modal')">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <!-- popCont -->
            <div class="popCont">
                <div class="imgArea">
                    <img :src="`http://localhost:3000/${post.image_url}`" alt="">
                </div>
                <div class="viewArea">
                    <div class="user">
                        <div class="info">
                            <div class="img">
                                <img :src="`${post.postUserProfile}`" :alt="`${post.userid}의 프로필`">
                            </div>
                            <span class="userid">{{ post.userid}}</span>
                        </div>
                        <button v-if="post.userid == currentUser.userid" class="btnDel" @click="onDeletePost(post)">삭제</button>
                    </div>
                    <div class="cont">
                        <!-- feed : 피드 내용 -->
                        <div class="feed">
                            <div class="img">
                                <img :src="`${post.postUserProfile}`" :alt="`${post.userid}의 프로필`">
                            </div>
                            <div class="textarea">
                                <strong>{{ post.userid }}</strong>
                                <span class="text">{{ post.content }}</span>
                            </div>
                        </div>
                        <!--  commentList : 댓글 목록 -->
                        <ul class="commentList">
                            <li v-for="(comment, idx) in comments" :key="comment">
                                <div class="comment">
                                    <div class="img">
                                        <img :src="`${comment.profile_img}`" :alt="`${comment.userid}의 프로필`">
                                    </div>
                                    <div class="reply">
                                        <strong>{{ comment.userid }}</strong>
                                        <span class="text">{{ comment.comment }}</span>
                                    </div>
                                </div>
                                <div class="etc">
                                    <span class="date">{{ moment(comment.created_at).fromNow() }}</span>
                                    <button v-if="comment.userid == currentUser.userid" class="btnDel" @click="onDeleteComment(comments, idx)">삭제</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment'
    import 'moment/locale/ko'  // 1분전, 1시간전, 하루전 이렇게 한글로 노출되게
    import { computed, ref } from 'vue';
    import store from '../store';
    import { useRouter } from 'vue-router';

    export default{
        props : [ 'post', 'comments' ],
        setup(props, {emit}) {
            const currentUser = computed(() => store.state.user);
            const replyList = ref([]);
            const router = useRouter();

            /* 댓글 삭제 */
            const onDeleteComment = async (comments, idx) => {
                //console.log(comments[idx])
                replyList.value = props.comments;

                try {
                    await axios.post('/api/comments/delete', {
                        userid : comments[idx].userid,
                        comment : comments[idx].comment
                    })
                    .then((res) => {
                        console.log(res.data.message);
                        replyList.value.splice(idx,1); //삭제할 댓글의 idx값 가져와서 배열에서 삭제
                        //console.log(replyList.value);
                        //console.log('props 변경 확인 : ', props.comments);
                    })
                } catch(err) {
                    console.log('댓글 삭제 에러메시지 : ', err);
                }
            }

            /* 게시글 삭제 */
            const onDeletePost = async (post) => {
                console.log(post)
                if(confirm('해당 게시글을 삭제하시겠습니까?')) {
                    try {
                        await axios.post('/api/feed/delete', {
                            postNo : post.postNo
                        })
                        .then((res) => {
                            //emit('close-modal');
                            router.go();
                            console.log(res.data.message)
                        })
                    }
                    catch(err) {
                        console.log('게시글 삭제 에러메시지 : ', err)
                    }
                }
            }

            return {
                currentUser,
                moment,
                onDeleteComment,
                replyList,
                onDeletePost,
                router,
            }
        }
    }
</script>