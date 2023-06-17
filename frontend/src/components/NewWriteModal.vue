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
        <button class="btnEnroll" @click="onUploadPost">공유하기</button>
      </div>
      <!-- popCont -->
      <div class="popCont">
        <div class="imgArea">
          <label for="file-image" class="fileUpload" v-if="!imageFile"> <!-- 이미지 업로드 되지 않았을 경우에 노출 -->
            <input type="file" id="file-image" accept="image/*" @change="onImageUpload">
            <i class="fas fa-camera"></i>
          </label>
          <div class="img" v-if="imageFile"> <!-- 이미지 업로드 되었을 경우에만 이미지태그 노출 -->
            <img :src="imageFile" alt=""/> 
            <button class="btnDel" @click="onImageDelete">
              <i class="fa-solid fa-x"></i>
            </button>
          </div>
        </div>
        <div class="writeArea">
          <div class="user">
            <img :src="currentUser.profile_img" alt="">
            <span>{{currentUser.userid}}</span>
          </div>
          <div class="textBox">
            <textarea placeholder="문구 입력..." v-model="postContent"></textarea>
            <p class="length">0/2000</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import store from '../store';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup(props, {emit}) { 
    const imageFile = ref(null);
    const saveImgFileUrl = ref(null);
    const postContent = ref('');
    const currentUser = store.state.user;
    const formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    const router = useRouter();

    /* 이미지 첨부 */
    const onImageUpload = (event) => {
      const file = event.target.files[0];
      saveImgFileUrl.value = file;
      formData.append("uploadImage", event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        imageFile.value = e.target.result;
      }
      reader.readAsDataURL(file)
    }

    /* 첨부된 이미지 삭제 */
    const onImageDelete = () => {
      imageFile.value = null
    }

    /* 게시물 피드 업로드 */
    const onUploadPost = async () => {
      if ( !saveImgFileUrl.value || !postContent.value) {
        alert('게시물 이미지와 글을 작성해 주세요.');
        return;
      } else {
        formData.append("userid", currentUser.userid);
        formData.append("content", postContent.value);
        formData.append("num_likes", 0);

        await axios.post('/api/feed', formData, config)
        .then( (res) => {
          console.log(res.data.message);
          emit('close-modal');

          if ( router.currentRoute._value.fullPath == '/')  { //홈에서 새 피드 등록 후 새로고침
            router.go();
          }

        })
        .catch((err) => {
            console.log('에러메세지 : ', err)
        });
      }
    }
    
    return {
      imageFile,
      saveImgFileUrl,
      postContent,
      currentUser,
      onImageUpload,
      onImageDelete,
      onUploadPost,
      router,
    }
  }
}
</script>