const nongye = {
  state: {
    tabs: [
      {
        id: 1,
        selected: true,
        title: "果产业",
        name: "fruit",
      },
      {
        id: 2,
        selected: false,
        title: "茶产业",
        name: "tea",
      },
      {
        id: 3,
        selected: false,
        title: "蜂产业",
        name: "bee",
      },
      {
        id: 4,
        selected: false,
        title: "中药产业",
        name: "drugs",
      },
      {
        id: 5,
        selected: false,
        title: "民宿产业",
        name: "guesthouse",
      },
    ],
  },

  getters: {
    tabs: (state) => state.tabs,
  },

  actions: {
    // 更新菜单状态
    updateTabs({ commit, state }, payload) {
      const { id } = payload;
      const { tabs } = state;
      tabs.map((tab) => {
        tab.selected = tab.id == id;
      });

      commit("SET_TABS", tabs);
    },

    // 重置tabs
    resetTabs({ commit }) {
      commit("RESET_TABS");
    },
  },
  mutations: {
    SET_TABS(state, payload) {
      state.tabs = payload;
    },
    RESET_TABS(state) {
      state.tabs = [
        {
          id: 1,
          selected: true,
          title: "果产业",
          name: "fruit",
        },
        {
          id: 2,
          selected: false,
          title: "茶产业",
          name: "tea",
        },
        {
          id: 3,
          selected: false,
          title: "蜂产业",
          name: "bee",
        },
        {
          id: 4,
          selected: false,
          title: "中药产业",
          name: "drugs",
        },
        {
          id: 5,
          selected: false,
          title: "民宿产业",
          name: "guesthouse",
        },
      ];
    },
  },
};

export default nongye;
