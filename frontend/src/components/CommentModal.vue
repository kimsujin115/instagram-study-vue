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
                        <button class="btnDel">삭제</button>
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
                            <li v-for="comment in comments" :key="comment">
                                <div class="comment">
                                    <div class="img">
                                        <img :src="`${comment.profile_img}`" :alt="`${comment.userid}의 프로필`">
                                    </div>
                                    <div class="reply">
                                        <strong>{{ comment.userid }}</strong>
                                        <span class="text">{{ comment.comment }}</span>
                                    </div>
                                </div>
                                <span class="date">{{ moment(comment.created_at).fromNow() }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import 'moment/locale/ko'  // 1분전, 1시간전, 하루전 이렇게 한글로 노출되게

    export default{
        props : [ 'post', 'comments' ],
        setup() {
            return {
                moment
            }
        }
    }
</script>