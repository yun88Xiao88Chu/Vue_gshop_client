/* 
用于操作首页模块数据的vuex模块
*/
import {reqLogin,reqLogout,reqRegister} from '@/api'
import {getUUID} from '@/utils/storageUtils'
const state = {
  userInfo: JSON.parse(localStorage.getItem('user_info_key')) || {}, // 登陆的用户信息对象
  userTempId: getUUID()
}

const mutations = {
  RECEIVE_USER_INFO(state,userInfo){
      state.userInfo = userInfo
  },
  RESET_USER_INFO(state){
    state.userInfo = {}
  }
}

const actions = {
  async login ({commit},{mobile,password}){
    const result = await reqLogin(mobile,password)
    if(result.code === 200){
       const userInfo = result.data
       localStorage.setItem('user_info_key',JSON.stringify(userInfo))
       commit('RECEIVE_USER_INFO',userInfo)
    }else{
      throw new Error(result.message || '登录失败')
    }
  },

  async register ({commit},userInfo){
    const result = await reqRegister(userInfo)
    if(result.code !== 200){
      throw new Error(result.message || '注册失败')
    }
  },

  async logout ({commit}){
    const result = await reqLogout()
    if(result.code === 200){
      commit('RESET_USER_INFO')
      localStorage.removeItem('user_info_key')
    }else{
      throw new Error(result.message || '退出登陆失败')
    }
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}