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
                            <router-link to="/">
                                <i class="icon fas fa-house"></i>
                                <span>홈</span>
                            </router-link>
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
                            <router-link to="/notifications">
                                <i class="icon fa-regular fa-heart"></i>
                                <span>알림</span>
                            </router-link>
                        </li>
                        <li>
                            <a href="#">
                                <i class="icon fa-regular fa-square-plus"></i>
                                <span>만들기</span>
                            </a>
                        </li>
                        <li>
                            <router-link to="/myfeed">
                                <div class="profile">
                                    <img src="http://picsum.photos/100" alt="">
                                </div>
                                <span>프로필</span>
                            </router-link>
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
            <!-- innerCont -->
            <div class="innerCont">
                <!-- content router-view -->
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>