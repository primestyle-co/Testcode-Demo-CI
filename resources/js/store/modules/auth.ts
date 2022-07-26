import authApi from './../../api/apis/auth'

// initial state
// shape: [{ id, quantity }]
const state = {
  user: window.user,
  login: true,
  checkoutStatus: null
}
// getters
const getters = {
}

// actions
const actions = {
  login ({ commit, state }, params) {
    return authApi.login(params).then(res => {
      commit('setUser', res.data.auth);
      commit('setLogin', true);
      return res;
    });
  },

  logout ({ state, commit }) {
    authApi.logout();
  },

  register ({ state, commit }, params) {
    return authApi.register(params);
  }
}

// mutations
const mutations = {
  setUser (state, value) {
    state.user = value;
  },

  setLogin (state, value) {
    state.login = value;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}