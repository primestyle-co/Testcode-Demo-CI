import postApi from './../../api/apis/post'

// initial state
// shape: [{ id, quantity }]
const state = {
  posts: {},
  post: {
    title: '',
    content: '',
  },
}

// getters
const getters = {
}

// actions
const actions = {
  search ({ commit, state }, params) {
    return postApi.search(params).then(res => {
      commit('setPosts', res.data.posts);
    });
  },

  create ({ commit, state }, params) {
    return postApi.create(params);
  },

  update ({ commit, state }, params) {
    return postApi.update(params);
  },

  detail ({ commit, state }, id) {
    return postApi.detail(id).then(res => {
      commit('setEditPost', res.data.post);
    });
  },

  delete ({ commit, state }, id) {
    return postApi.delete(id);
  },
}

// mutations
const mutations = {
  setPosts (state, res) {
    state.posts = res;
  },
  setEditPost (state, res) {
    state.post = res;
  },
  updatePostTitle (state, value) {
    state.post.title = value
  },
  updatePostContent (state, value) {
    state.post.content = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}