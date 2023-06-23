import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    state() {
        return {
            user : null
        }
    },
    mutations : { //상태 변경
        SET_USER : (state, user) => {
            state.user = user
        },
        SET_PROFILE : (state, image) => {
            state.user.profile_img = image
        }
    },
    //새로고침 시 상태 초기화 방지하는 플러그인
    //vuex에 저장되는 값들을 사용하는 웹브라우저의 localstorage에 저장하며, 새로고침시 그 값이 있다면 localstorage의 값을 가져와 사용한다는 원리
    plugins: [createPersistedState()],
})

export default store