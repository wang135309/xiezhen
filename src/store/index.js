// 入口文件
import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'// 通过mutation修改state时会在控制台打印日志

Vue.use(Vuex)
// vuex调试工具
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  // actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
