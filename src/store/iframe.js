const window = {
  state: {
    level: "county", // 地图层级
    isFinished: false, // 地图是否加载完成
    areaFeatureNum: [], // 地图相关图例数据
    areaCode: null, // 当前行政区划adcode，用来从areaFeatureNum取数据
    areaName: null, // 当前行政区划名称，用来在三资管理页面查询数据
    number: [], // 图例数量 有些有两种图例所以用数组存储
    iframeUrl: null,
    tableInfo: null, // 右侧列表展示的主体信息
    searchResult: [], // 搜索结果
  },

  mutations: {
    SET_LEVEL(state, payload) {
      state.level = payload;
    },
    SET_ISFINISHED(state, payload) {
      state.isFinished = payload;
    },
    SET_AREAFEATURENUM(state, payload) {
      state.areaFeatureNum = payload;
    },
    SET_AREACODE(state, payload) {
      state.areaCode = payload;
    },
    SET_AREANAME(state, payload) {
      state.areaName = payload;
    },
    SET_IFRAMEURL(state, payload) {
      state.iframeUrl = payload;
    },
    SET_TABLEINFO(state, payload) {
      state.tableInfo = payload;
    },
    SET_SEARCHRESULT(state, payload) {
      state.searchResult = payload;
    },
  },

  actions: {
    setLevel({ commit, dispatch }, payload) {
      // 返回县级 清空右侧详情
      if (payload == "county") {
        dispatch('setTableInfo', null)
      }
      commit("SET_LEVEL", payload);
    },
    setIsFinished({ commit }, payload) {
      commit("SET_ISFINISHED", payload);
    },
    setAreaFeatureNum({ commit }, payload) {
      commit("SET_AREAFEATURENUM", payload);
    },
    setAreaCode({ commit }, payload) {
      commit("SET_AREACODE", payload);
    },
    setAreaName({ commit }, payload) {
      commit("SET_AREANAME", payload);
    },
    setIframeUrl({ commit }, payload) {
      commit("SET_IFRAMEURL", payload);
    },
    setTableInfo({ commit, state }, payload) {
      // 传入payload为null 清空对象字段值
      if (state.tableInfo && !payload) {
        let tableInfo = state.tableInfo;
        Object.keys(tableInfo).forEach((key) => {
          tableInfo[key] = "";
        });

        return commit("SET_TABLEINFO", tableInfo);
      }
      commit("SET_TABLEINFO", payload);
    },
    setSearchResult({ commit }, payload) {
      commit("SET_SEARCHRESULT", payload);
    },
  },

  getters: {
    level: (state) => state.level,
    isFinished: (state) => state.isFinished,
    areaFeatureNum: (state) => state.areaFeatureNum,
    areaCode: (state) => state.areaCode,
    areaName: (state) => state.areaName,
    iframeUrl: (state) => state.iframeUrl,
    tableInfo: (state) => state.tableInfo,
    searchResult: (state) => state.searchResult,
  },
};

export default window;
