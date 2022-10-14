const menu = {
  state: {
    leftMenu: [
      {
        id: 1,
        title: "自然资源",
        activated: true,
        name: "ziranziyuan",
      },
      {
        id: 2,
        title: "农资资源",
        activated: false,
        name: "nongziziyuan",
      },
      {
        id: 3,
        title: "农业产业",
        activated: false,
        name: "nongyechanye",
      },
    ],
    rightMenu: [
      {
        id: 4,
        title: "三资管理",
        activated: false,
        name: "sanziguanli",
      },
      {
        id: 5,
        title: "乡村物流",
        activated: false,
        name: "xiangcunwuliu",
      },
      {
        id: 6,
        title: "招商资源",
        activated: false,
        name: "zhaoshangziyuan",
      },
    ],
  },

  getters: {
    leftMenu: (state) => state.leftMenu,
    rightMenu: (state) => state.rightMenu,
  },

  actions: {
    // 更新菜单状态
    updateMenus({ commit, state }, payload) {
      const { name } = payload;
      const { leftMenu, rightMenu } = state;
      leftMenu.map((item) => {
        item.activated = item.name == name;
      });
      rightMenu.map((item) => {
        item.activated = item.name == name;
      });
      commit("SET_MENU", { leftMenu, rightMenu });
    },

    // 重置菜单
    resetMenu({ commit }) {
      commit("RESET_MENU");
    },
  },
  mutations: {
    SET_MENU(state, payload) {
      state.leftMenu = payload.leftMenu;
      state.rightMenu = payload.rightMenu;
    },
    RESET_MENU(state) {
      state.leftMenu = [
        {
          id: 1,
          title: "自然资源",
          activated: true,
          name: "ziranziyuan",
        },
        {
          id: 2,
          title: "农资资源",
          activated: false,
          name: "nongziziyuan",
        },
        {
          id: 3,
          title: "农业产业",
          activated: false,
          name: "nongyechanye",
        },
      ];
      state.rightMenu = [
        {
          id: 4,
          title: "三资管理",
          activated: false,
          name: "sanziguanli",
        },
        {
          id: 5,
          title: "乡村物流",
          activated: false,
          name: "xiangcunwuliu",
        },
        {
          id: 6,
          title: "招商资源",
          activated: false,
          name: "zhaoshangziyuan",
        },
      ];
    },
  },
};

export default menu;
