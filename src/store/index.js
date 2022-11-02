import Vue from 'vue'
import Vuex from 'vuex'
// 导入插件
import createPresistedSate from "vuex-persistedstate"
import userlogin from "./userlogin"

Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[createPresistedSate({
    storage:window.localStorage,
  })],
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userlogin
  }
})
