/* 
所有路由配置的数组模块
*/
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import shopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupBuy from '@/pages/Center/GroupBuy'
import store from '@/store'

export default [
  {
    path: '/',
    component: Home
  },
  {
    name: 'search', // 如果是params参数需要指定此名称
    path: '/search/:keyword?', // 指定通过params参数携带数据  ?代表params参数可以不传
    component: Search,
    // 将query/params参数映射成props传递给路由组件
    props: (route) => ({ keyword1: route.params.keyword, keyword2: route.query.keyword })
  },
  {
    name: 'detail', // 如果是params参数需要指定此名称
    path: '/detail/:skuId', // 这个parasms参数必传,商品id
    component: Detail,
    // 将query/params参数映射成props传递给路由组件
    // props: (route) => ({ keyword1: route.params.keyword, keyword2: route.query.keyword })
  },
  {
    path:'/addcartsuccess',
    component: AddCartSuccess,
    beforeEnter(to,from,next){
      const skuInfo = JSON.parse(window.sessionStorage.getItem('SKU_INFO_KEY'))
      const {skuId,skuNum} = to.query
      if(skuId && skuNum && skuInfo){
          next()
      }else{
        next(from.path)
      }
    }
  },
  {
    path:'/shopcart',
    component: shopCart,
  },
  {
    path: '/register',
    component: Register,
    meta: {
      isHideFooter: true, // 标识footer是否隐藏
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isHideFooter: true, // 标识footer是否隐藏
    },
    beforeEnter: (to, from, next) => {
      if(store.state.user.userInfo.name){
          next('/')
      }else{
        next()
      }
    }
  },
  {
    path:'/trade',
    component: Trade,
    beforeEnter: (to, from, next) => {
      if(from.path === '/shopcart'){
         next()
      }else{
        next('/shopcart')
      }
    }
  },
  {
    path:'/pay',
    component: Pay,
    props:route=>({orderId:route.query.orderId}),
    beforeEnter: (to, from, next) => {
      if(from.path==='/trade'){
          next()
      }else{
        next('/trade')
      }
    } 
  },
  {
    path:'/paysuccess',
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      if(from.path==='/pay'){
          next()
      }else{
        next('/pay')
      }
    }
  },
  {
    path:'/center',
    component: Center,
    children:[
      {
        path:'/center/myorder',
        component: MyOrder,
      },
      {
        path:'groupbuy',
        component: GroupBuy,
      },
      {
        path:'',
        redirect:'/center/myorder'
      }
    ]
  },
]