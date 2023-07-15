<template>
    <div class="modalPopup commentPopup">
        <div class="dim"></div>
        <!-- popWrap -->
        <div class="popWrap">
            <!-- popHead -->
            <div class="popHead">
                <h3>댓글</h3>
                <button class="btnClose">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <!-- popCont -->
            <div class="popCont">
                <div class="imgArea">
                    <img src="http://picsum.photos/600" alt="">
                </div>
                <div class="viewArea">
                    <div class="user">
                        <div class="info">
                            <div class="img">
                                <img src="http://picsum.photos/300" alt="">
                            </div>
                            <span class="userid">userid</span>
                        </div>
                        <button class="btnDel">삭제</button>
                    </div>
                    <div class="cont">
                        <!-- feed -->
                        <div class="feed">
                            <div class="img">
                                <img src="http://picsum.photos/300" alt="">
                            </div>
                            <div class="textarea">
                                <strong>userid</strong>
                                <span class="text">게시글 내용입니다.</span>
                            </div>
                        </div>
                        <!--  commentList -->
                        <ul class="commentList">
                            <li v-for="comment in 8" :key="comment">
                                <div class="comment">
                                    <div class="img">
                                        <img src="http://picsum.photos/200" alt="">
                                    </div>
                                    <div class="reply">
                                        <strong>comment user</strong>
                                        <span class="text">댓글 내용입니다.</span>
                                    </div>
                                </div>
                                <span class="date">2분전</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

</script>