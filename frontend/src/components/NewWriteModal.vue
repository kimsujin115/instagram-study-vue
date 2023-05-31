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
          <label for="file-image" class="fileUpload" v-if="!imageFile"> <!-- 이미지 업로드 되지 않았을 경우에 노출 -->
            <input type="file" id="file-image" accept="image/*" @change="onimageUpload">
            <i class="fas fa-camera"></i>
          </label>
          <img :src="imageFile" v-if="imageFile" alt=""/> <!-- 이미지 업로드 되었을 경우에만 이미지태그 노출 -->
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
import { ref } from 'vue'
export default {
  setup() { 
    const imageFile = ref(null);

    const onimageUpload = (event) => {
      const file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        imageFile.value = e.target.result;
      }
      reader.readAsDataURL(file)
    }

    
    return {
      imageFile,
      onimageUpload,
    }
  }
}
</script>