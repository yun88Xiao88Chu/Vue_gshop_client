<template>
  <!--分页组件-->
  <div class="pagination" v-if="pageConfig.total>0">
    <!--上一页-->
    <button :disabled="currentPage===1" @click="changeCurrentPage(currentPage-1)">上一页</button>
    <!-- 第1页 -->
    <button v-if="startEnd.start > 1" @click="changeCurrentPage(1)">1</button>
    <!-- 省略号 start>2才显示 -->
    <button disabled v-if="startEnd.start>2">···</button>
      <!-- 连续页码 -->
    <button v-for="item in startEnd.end"
    :key ="item"
    :class="{active:currentPage === item}"
    v-if="item>=startEnd.start"
    @click="changeCurrentPage(item)">{{item}}</button> <!-- 34567 -->

    <!-- 省略号 end<totalPages-1  -->
    <button disabled v-if="startEnd.end < totalPages-1">···</button>
    <!-- 最后一页 -->
    <button v-if="startEnd.end<totalPages" @click="changeCurrentPage(totalPages)">{{totalPages}}</button>
    <!--下一页-->
    <button :disabled="currentPage===totalPages" @click="changeCurrentPage(currentPage+1)">下一页</button>
    <!-- 总记录数 -->
    <button disabled style="margin-left: 30px">共{{pageConfig.total}}条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:{
      pageConfig:{
        type: Object,
        default:{
          total: 0,  //总数据个数                      
          showPageNo: 5,  //连续页码                 
          pageNo: 1,      //当前页码                 
          pageSize: 10     //每页数据个数                
        }
      }
    }, 
   data(){
     return {
       currentPage: this.pageConfig.pageNo  //当前页码
     }
   },
  
   computed: {
      //总页码
      totalPages () {
        const {total,pageSize} = this.pageConfig
        return Math.ceil(total/pageSize)
      },
     /* 
      根据已有数据计算出连续页码的start和end
     */
    startEnd(){
      let start = 0;
      let end = 0;
      // 当前页码/连续页码/总页码数
      // const currentPage = this.currentPage
      // const showPageNo = this.pageConfig.showPageNo
      // const totalPages = this.totalPages
      const {totalPages,currentPage,pageConfig:{showPageNo}} = this//二级解构,解构出pageConfig里面的showPageNo,
      start = currentPage - Math.floor(showPageNo/2)
      if(start < 1){
        start = 1
      }                               //多层级对象解构
      end = start + showPageNo - 1
      if(end > totalPages){
         end = totalPages
         start = end - showPageNo + 1  //可以带入具体的值测试计算
         if(start < 1){ //注意这个条件: 2(当前) 5(连续) 3(最大页码) => start=1=>end=3,start=-1=>此时要再次修正start=1   
           start = 1
         }
      } 
      return {start,end}
    }
   },
    watch: {
     'pageConfig.pageNo'(value){
       this.currentPage = value
     }
   },
   methods: {
     /* 当前页码改为指定页码 */
     changeCurrentPage(page){
       this.currentPage = page
       this.$emit('changeCurrentPage',page)
     }
   },
  }
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline:none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>