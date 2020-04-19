<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 已登录状态 -->
          <p v-if="userInfo.name">
            <span >{{userInfo.name}}</span>
            &nbsp;&nbsp;&nbsp;
            <a href="javascript:" @click="logout">退出</a>
          </p>
          <!-- 未登录显示 -->
          <p v-else>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/">
          <img src="./images/logo.png" alt="">
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"/>
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    name: 'Header',

    data () {
      return {
        keyword: ''
      }
    },
    computed: {
      ...mapState({
        userInfo:state=>state.user.userInfo
      })
    },
    mounted() {
      //通过全局总线绑定removeKeyword事件监听
      this.$bus.$on('removeKeyword',()=>{
        this.keyword = '' //置空搜索关键字
      })
    },

    methods: {
      async logout(){
        try {
          await this.$store.dispatch('logout')
          this.$router.replace('/')
        } catch (error) {
          alert(error.message)
        }
      },
      toSearch () { 
        // 得到当前的请求路径和query参数对象
            const {path,query} = this.$route
            if(this.keyword){
              if(path.indexOf('/search')===0){
                 this.$router.push({
                   name:'search',
                   params:{keyword:this.keyword},
                   query
                 }) 
              }else{
                 this.$router.push({name:'search',params:{keyword:this.keyword}})
              }
            }else{
              if(path.indexOf('/search')===0){
                  this.$router.push({name:'search',query})
              }else{
                this.$router.push({name:'search'})
              }
            }
        // this.$router.replace('/search')

        /* 
        , (error) => {
          console.log('跳转路由出错', error)
        }
        */
      }
    }
  }
</script>

<style lang="less" scoped>
  .header {
    &>.top {
      background-color: #eaeaea;
      height: 30px;
      line-height: 30px;

      .container {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .loginList {
          float: left;

          p {
            float: left;
            margin-right: 10px;

            .register {
              border-left: 1px solid #b3aeae;
              padding: 0 5px;
              margin-left: 5px;
            }
          }
        }

        .typeList {
          float: right;

          a {
            padding: 0 10px;

            &+a {
              border-left: 1px solid #b3aeae;
            }
          }

        }

      }
    }

    &>.bottom {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .logoArea {
        float: left;

        .logo {
          img {
            width: 175px;
            margin: 25px 45px;
          }
        }
      }

      .searchArea {
        float: right;
        margin-top: 35px;

        .searchForm {
          overflow: hidden;

          input {
            box-sizing: border-box;
            width: 490px;
            height: 32px;
            padding: 0px 4px;
            border: 2px solid #ea4a36;
            float: left;

            &:focus {
              outline: none;
            }
          }

          button {
            height: 32px;
            width: 68px;
            background-color: #ea4a36;
            border: none;
            color: #fff;
            float: left;
            cursor: pointer;

            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  }
</style>