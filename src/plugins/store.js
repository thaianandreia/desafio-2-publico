import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pessoas: []
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    savePessoas (context) {
      context.commit('increment')
    },
  },
  getters: {
    pessoas: (state, actions) => {
      if (state.pessoas.length === 0) {
        if (localStorage.pessoas) { state.pessoas = JSON.parse(localStorage.pessoas) }
      }
      return state.pessoas
    },
    pessoa: (state, getters) => {
      return getters.doneTodos.length
    }
  }
})
