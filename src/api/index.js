/* 
包含所有接口请求函数
函数的返回值是promise
*/
import ajax from './ajax'
import mockAjax from './mockAjax'

// 获取三级分类列表  /api/product/getBaseCategoryList
export const reqBaseCategoryList = () => ajax('/product/getBaseCategoryList')


// 请求mock的接口, 获取轮播列表数据
export const reqBanners = () => mockAjax.get('/banners')
// 请求mock的接口, 获取所有楼层的列表数据
export const reqFloors = () => mockAjax.get('/floors')



// 请求搜索匹配的商品相关数据
export const reqProductList = (searchParams) => ajax.post('/list', searchParams)
// reqProductList({}) 直接调用测试能够在Network测试里看到返回的数据结构,
//方便去写vuex用结构里什么属性来管理数据,通过测试知道数据结构很重要

//详情Detail接口
//获取商品详情信息
export const reqDetailInfo = (skuId) => ajax.get(`/item/${skuId}`)

// 添加到购物车
export const reqAddToCart = (skuId, skuNum) => ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)
// 获取购物车数据列表
export const reqCartList = () => ajax.get('/cart/cartList')
// 指定购物项的选中状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqCheckCartItem = (skuId, isChecked) => ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)
// 删除购物车商品 /api/cart/deleteCart/{skuId}
export const reqDeleteCartItem = (skuId) => ajax.delete(`/cart/deleteCart/${skuId}`)


//登陆 /api/user/passport/login
export const reqLogin = (mobile,password) => ajax.post('/user/passport/login',{mobile,password})
//退出登陆
export const reqLogout = () =>ajax.get('/user/passport/logout')
//注册Register接口
export const reqRegister = (userInfo) => ajax.post('/user/passport/register',userInfo)

// 获取交易信息
export const reqTradeInfo = ()=>ajax.get(`/order/auth/trade`)
// 提交订单
export const reqSubmitOrder = (orderInfo,tradeNo)=>ajax.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`,orderInfo)
//获取订单列表
export const reqTradeList = (page,limit)=>ajax.get(`/order/auth/${page}/${limit}`)
//获取订单支付信息
export const reqTradePay = (orderId)=> ajax.get(`payment/weixin/createNative/${orderId}`)
//查询订单支付状态
export const reqTradeStatus = (orderId)=> ajax.get(`payment/weixin/queryPayStatus/${orderId}`)
