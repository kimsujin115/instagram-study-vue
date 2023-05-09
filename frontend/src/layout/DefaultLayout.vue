<template>
    <div class="layoutWrap">
        <!-- left side -->
        <div class="sideMenu">
            <div class="menuArea">
                <h1 class="logo">
                    <i class="fa-brands fa-instagram"></i>
                </h1>
                <nav>
                    <ul>
                        <li>
                            <a href="#">
                                <i class="icon fas fa-house"></i>
                                <span>홈</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="icon fas fa-magnifying-glass"></i>
                                <span>검색</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="icon far fa-paper-plane"></i>
                                <span>메세지</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="icon fa-regular fa-heart"></i>
                                <span>알림</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="icon fa-regular fa-square-plus"></i>
                                <span>만들기</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div class="profile">
                                    <img src="http://picsum.photos/100" alt="">
                                </div>
                                <span>프로필</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="etcArea">
                <button>
                    <i class="icon fas fa-bars"></i>
                    <span>더보기</span>
                </button>
            </div>
        </div>

        <!-- main section -->
        <div class="contentWrap">
            <ul class="feedList">
                <li v-for="feed in 5" :key="feed">
                    <div class="user">
                        <div class="profile">
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
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {

}
</script>