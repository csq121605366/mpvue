const app = {
  state: {
    friend: []
  },
  mutations: {
    PUSH_FRIEDN(state, friend) {
      state.friend.push(friend)
    },
    SPLICE_FRIEND(state, index) {
      state.friend.splice(index, 1);
    }
  },
  actions: {
    push_friend({ commit, state }, data) {
      commit('PUSH_FRIEDN', data);
    },
    splice_friend({ commit, state }, index) {
      commit('SPLICE_FRIEND', index);
    }
  }
};

export default app;
