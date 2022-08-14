import postApi from "./../../api/apis/post";

// initial state
// shape: [{ id, quantity }]
const state = {
    posts: {},
    post: {
        title: "",
        content: "",
    },
};

// getters
const getters = {};

// actions
const actions = {
    search({ commit }, params) {
        return postApi.search(params).then((res) => {
            commit("setPosts", res.data.posts);
        });
    },

    create(_, params) {
        return postApi.create(params);
    },

    update(_, params) {
        return postApi.update(params);
    },

    detail({ commit }, id) {
        return postApi.detail(id).then((res) => {
            commit("setEditPost", res.data.post);
        });
    },

    delete(_, id) {
        return postApi.delete(id);
    },
};

// mutations
const mutations = {
    setPosts(state, res) {
        state.posts = res;
    },
    setEditPost(state, res) {
        state.post = res;
    },
    updatePostTitle(state, value) {
        state.post.title = value;
    },
    updatePostContent(state, value) {
        state.post.content = value;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
