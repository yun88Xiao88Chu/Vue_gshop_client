/* 管理购物车模块相关数据的vuex模块 */

import {reqAddToCart, reqCartList, reqCheckCartItem, reqDeleteCartItem} from '@/api'
const state={
  cartList:[], //所有购物车列表数据
}

const mutations = {
  RECEIVE_CART_LIST(state,cartList){
    state.cartList = cartList
  }
}

const actions = {
  async checkCartItem ({commit},{skuId,isChecked}){
    const result = await reqCheckCartItem(skuId,isChecked)
    if(result.code !== 200){
       throw new Error(result.message || '勾选购物失败') 
    }
  },
  async deleteCartItem({commit},skuId){
    const result = await reqDeleteCartItem(skuId)
    return result.code === 200 ? '': result.message || '删除购物项失败' 
  },
  async deleteCartItem2 ({commit},skuId){
    const result = await reqDeleteCartItem(skuId)
    if(result.code!==200){
      // return Promise.reject(new Error('删除购物项失败'))
      throw new Error('删除购物项失败')
    }
  },
  /* 获取购物车列表的数据 */
   async getCartList ({commit}){
     const result = await reqCartList()
     if(result.code === 200){
        const cartList = result.data
        commit('RECEIVE_CART_LIST',cartList)
     }
   },
   
   /* 添加到购物车的异步actions */
   async addToCart({commit},{skuId,skuNum,callback}){
     const result = await reqAddToCart(skuId,skuNum)
     if(result.code ===200){
        callback('')
     }else{
        callback(result.message || '添加购物车失败')
     }
   },
   async addToCart2 ({commit},{skuId,skuNum}){
     const  result = await reqAddToCart(skuId,skuNum)
     return result.code === 200 ? '': (result.message || '添加到购物车失败') 
   },
   async addToCart3({dispatch},{skuId,skuNum}){
      const result = await reqAddToCart(skuId,skuNum)
      if(result.code === 200){
          dispatch('getCartList')
      }else{
        alert(result.message || '添加购物车失败')
      }
   }
}

const getters = {
  /* 总数量 */
  totalCount (state) {
    return state.cartList.reduce((pre,item)=>{
      return item.isChecked === 1 ? pre+ item.skuNum :pre
    },0)
  },

  /* 总价格 */
  totalPrice (state){
      return state.cartList.reduce((pre,item)=>{
          return item.isChecked === 1? pre + item.skuNum*item.cartPrice :pre
      },0)
  },

  /* 是否全选 */
  isAllChecked (state){
    return state.cartList.length > 0 && state.cartList.every((item,index)=>item.isChecked===1)
  },
  /* 所有选中购物项的数组 */
  selectedItems (state){
    // return state.cartList.filter((item,index)=>item.isChecked===1)
    return state.cartList.reduce((pre,item)=>{
      if(item.isChecked===1){
        pre.push(item)
      }
      return pre
    },[])
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}