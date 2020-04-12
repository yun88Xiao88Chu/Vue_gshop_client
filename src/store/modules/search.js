/* 
管理搜索模块的数据
*/
import {reqProductList} from '@/api'

const state = {
  productList: {}, // 搜索出的商品列表相关数据的对象 
}

const mutations = {
  /* 
  接收保存商品列表相关数据对象
  */
  RECEIVE_PRODUCT_LIST (state, productList) {
    state.productList = productList
  }
}

const actions = {
  /* 
  根据指定的搜索条件, 异步获取商品列表的action
  */
  async getProductList ({commit}, searchParams) {
    searchParams = {...searchParams}
    Object.keys(searchParams).forEach(key=>{
      if(searchParams[key]===''){
        delete searchParams[key]
      }
    })
    // 1. ajax请求,调用/api引入进来搜索的接口函数,传一个搜索的params参数,获取数据
    const result = await reqProductList(searchParams)
    // 2. 如果成功, 提交给mutation
    if (result.code===200) {
      const productList = result.data
      commit('RECEIVE_PRODUCT_LIST', productList)
    }
  }
}
const getters = { //根据测试得到的数据结构,将state里面关于search的需要的数据整合成三方面供外面使用
  // 返回品牌列表
  trademarkList (state) {
    return state.productList.trademarkList || []
  },

  // 返回属性列表
  attrsList (state) {
    return state.productList.attrsList || []
  },

  // 商品列表
  goodsList (state) {
    return state.productList.goodsList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}