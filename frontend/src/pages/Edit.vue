<template>
    <h3 class="pageTit">프로필 편집</h3>
    <div class="editWrap">
        <div class="row">
            <em class="tit">프로필</em>
            <div class="profile">
                <div class="img">
                    <img src="http://picsum.photos/200" alt="">
                </div>
                <div class="user">
                    <p class="uid">userid</p>
                    <label for="picFile" class="profleChange">
                        <input type="file" id="picFile" accept="image/*">
                        <span>프로필 사진 바꾸기</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="row">
            <em class="tit">소개</em>
            <div class="intro">
                <textarea placeholder="소개글을 입력하세요."></textarea>
                <p class="numchk">0/100</p>
            </div>
        </div>
        <button class="btnComplete">제출</button>
    </div>
</template>

<script>
    export default{
        setup() {

            return {

            }
        }
    }
</script>