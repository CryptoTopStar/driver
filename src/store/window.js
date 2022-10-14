const window = {
  state: {
    //页面的宽高
    innerWH: {},
  },

  mutations: {
    SET_INNER_WH(state, payload) {
      state.innerWH = payload;
    },
  },

  actions: {
    setInnerWH({ commit }, payload) {
      commit("SET_INNER_WH", payload);
    },
  },
};

export default window;
