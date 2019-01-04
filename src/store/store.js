import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPage:'',
    isMovePage:false,
    isLayerView:false
  },
  mutations: {
    changePage (state, pageName) {
      state.currentPage = pageName;
    },
    isMovePage (state, payload) {      
      state.isMovePage = payload;
    },
    isLayerView (state, payload) {
      state.isLayerView = payload;
    }
  },
  actions: {

  }
})
