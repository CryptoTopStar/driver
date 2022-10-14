const JiangShan = {
  state: {
    showUnderModal: false,
    showUnderDetailModal: false,
    underModalData: {},
    underModalDetailData: {}
  },
  mutations: {
    setShowUnderModal(state, payload) {
      state.showUnderModal = payload
    },
    setShowUnderDetailModal(state, payload) {
      state.showUnderDetailModal = payload
    },
    setUnderModalData(state, payload) {
      state.underModalData = payload
    },
    setUnderModalDetailData(state, payload) {
      state.underModalDetailData = payload
    }
  }
}

export default JiangShan
