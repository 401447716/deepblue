import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {
      icon: '',
      name: '',
      account: '',
      password: ''
    },
    channelID: null
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    }
  },
  mutations: {
    setUserInfo (state, value) {
      for (let key in value) {
        Vue.set(state.userInfo, key, value[key])
      }
    },
    deleteUserInfo (state, value) {
      Vue.delete(state.userInfo, value.key)
    }
  },
  actions: {
    upVuex (context, data) {
      context.commit(data.mutations, data.value)
    }
  }
})

export default store
