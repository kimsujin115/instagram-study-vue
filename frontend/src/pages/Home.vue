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
        <li v-for="feed in 5" :key="feed">
            <div class="user">
                <div class="profile active">
                    <img src="http://picsum.photos/100" alt="" />
                </div>
                <span class="name">instar.id</span>
                <span class="date">1일</span>
            </div>
            <div class="feedImg">
                <img src="http://picsum.photos/600" alt="" />
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
            <p class="like_num">좋아요 111개</p>
            <div class="feedText">
                <span class="writer">instar.id</span>
                <span class="text">인스타 피드 게시글 내용인스타 피드 게시글 내용인스타 피드 게시글 내용인스타 피드 게시글 내용인스타 피드 게시글 내용인스타 피드 게시글 내용</span>
                <button class="btnMore">...더 보기</button>
            </div>
        </li>
    </ul>
</template>

<script>
export default {

}
</script>
