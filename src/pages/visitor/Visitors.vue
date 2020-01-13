<template>
  <div class="visitor">
    <h2>访客管理</h2>
    <!-- {{visitor}} -->
    <!-- {{total}} -->
    <!-- 表格 -->
    <div>
      <el-table :data="visiter" size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection" prop="id" width="55" />
        <!-- <el-table-column prop="id" label="编号" /> -->
        <el-table-column prop="visitor" label="姓名" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="consumer.name" label="被访问人" />
        <el-table-column prop="consumer.role.name" label="被访问人角色" />
        <el-table-column prop="consumer.phone" label="被访问人电话" />
        <el-table-column prop="reason" label="访问原因" />
        <el-table-column prop="start" label="访问开始时间" />
        <el-table-column prop="end" label="访问结束时间" />
        <el-table-column prop="flag" label="状态" :formatter="selectEle" />
      </el-table>
    </div>
    <div>
      <el-pagination
        :current-page.sync="page"
        :page-size="size"
        layout="total, prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange">
        >
      </el-pagination>
    </div>
   
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
        page:1,
        size:2,
      }
  },
  computed: {
    ...mapState('visitors', ['visiter','total']),
  },
  created() {
    this.findAllVisitor({page:1,size:2});
    this.findByYema();
  },
  methods: {
    ...mapMutations('visitors', [ 'setTotal']),
    ...mapActions('visitors', ['findAllVisitor', ]),
    // 普通方法
    handleSelectionChange(val) {
      this.ids = val.map(item => item.id)
    },
    
   
    selectEle:function (row, column, flag) {
            if (flag === 1){
                return '正常';
            }else{
              return '注销'
            }
    },
    findByYema(){
        let obj = {
          page:this.page,
          size:2,
        }
        this.findAllVisitor(obj)
      },
    handleCurrentChange(val) {
        // this.page = val + 1 
        console.log(this.page)
    }

  },
  // 监听分页
    watch:{
      page:function(){
        this.findByYema()
      }
    }

}
</script>
<style scoped>
.visitor{
  padding: 1.5em
}
</style>
