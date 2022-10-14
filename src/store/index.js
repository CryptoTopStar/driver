import { createStore } from 'vuex'
import window from './window'
import menu from './menu'
import nongye from './nongye'
import iframe from './iframe'
import JiangShan from './jiangShan'

// 创建一个新的 store 实例
const store = createStore({
  modules: {
    window,
    menu,
    nongye,
    iframe,
    JiangShan
  }
})

export default store
