import * as types from './mutation-types'
// 改变vuex中保存的状态值的文件
const mutations = {
  // 第一个数组为取出types中SET_SINGER作为方法名，第一个参数为当前状态，第二个参数提交给管理工具的值
  [types.IS_LOGIN] (state, login) {
    state.islogin = login
  },
  [types.IMGS_ID] (state, imgsId) {
    state.imgsId = imgsId
  },
  [types.SEE_NUM] (state, seeNum) {
    state.seeNum = seeNum
  },
  [types.ALL_NUM] (state, allNum) {
    state.allNum = allNum
  }
}

export default mutations
