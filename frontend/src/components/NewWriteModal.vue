<template>
  <div class="newWritePopup">
    <div class="dim" @click="$emit('close-modal')"></div>
    <!-- popWrap -->
    <div class="popWrap">
      <!-- popHead -->
      <div class="popHead">
        <button class="back" @click="$emit('close-modal')">
        <i class="fa-solid fa-arrow-left"></i>
        </button>
        <h3>새 게시물 만들기</h3>
        <button class="btnEnroll">공유하기</button>
      </div>
      <!-- popCont -->
      <div class="popCont">
        <div class="imgArea">
          <label for="file-image" class="fileUpload">
            <input type="file" id="file-image">
            <i class="fas fa-camera"></i>
          </label>
          <!-- <img src="http://picsum.photos/800" alt="" /> -->
        </div>
        <div class="writeArea">
          <div class="user">
            <img src="http://picsum.photos/300" alt="">
            <span>user.id</span>
          </div>
          <div class="textBox">
            <textarea placeholder="문구 입력..."></textarea>
            <p class="length">0/2000</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() { 

    
    return {
    }
  }
}
</script>