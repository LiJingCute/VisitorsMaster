<template>
  <div class="users">
    <h2>用户管理</h2>
    <!-- {{user}} -->
    <!-- {{total}} -->
    <!-- 按钮 -->
    <div>
      <el-button size="small" round type="primary" @click="toAddHandler">添加</el-button>
      <br>
      <!-- <el-button size="small" type="danger" @click="batchDeleteHandler">批量删除</el-button> -->
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="user" size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection" prop="id" width="55" />
        <!-- <el-table-column prop="id" label="编号" /> -->
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="role.name" label="角色" />
        <el-table-column prop="flag" label="状态" :formatter="selectEle" />
        <el-table-column label="操作" width="60" align="center">
          <template #default="record">
            <i class="el-icon-delete" href="" @click.prevent="deleteHandler(record.row.id)" /> &nbsp;
            <i class="el-icon-edit-outline" href="" @click.prevent="editHandler(record.row)" />
          </template>
        </el-table-column>
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
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
     <!-- {{usersinfo}} -->
      <el-form ref="usersForm" :model="usersinfo" :rules="rules">
        <el-form-item label="姓名" label-width="100px" prop="name">
          <el-input v-model="usersinfo.name" auto-complete="off" />
        </el-form-item>
        <el-form-item label="电话" label-width="100px" prop="phone">
          <el-input v-model="usersinfo.phone" auto-complete="off" />
        </el-form-item>
         <el-form-item label="密码" label-width="100px" prop="pwd">
          <el-input v-model="usersinfo.pwd" type="password" auto-complete="off" />
        </el-form-item>
        <el-form-item label="状态" label-width="100px" prop="flag">
          <el-select v-model="usersinfo.flag" placeholder="请选择用户状态">
            <el-option label="正常" :value=1></el-option>
            <el-option label="注销" :value=0></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" label-width="100px" prop="role">
          <el-select  v-model="usersinfo.role.id" placeholder="请选择用户角色">
            <el-option label="管理员" :value=1></el-option>
            <el-option label="职员" :value=2></el-option>
          </el-select>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeModal">取 消</el-button>
        <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /模态框 -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      usersinfo: {
        role:{id:""}
        },
        page:1,
        size:2,

      // ids: [],
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          flag: [
            { required: true, message: '请选择用户状态', trigger: 'blur' }
          ],
          // role: [
          //   { required: true, message: '请选择用户状态', trigger: 'blur' }
          // ]
        }
      }
  },
  computed: {
    ...mapState('users', ['user', 'visible', 'title','total']),
    ...mapGetters('users', ['usersSize'])
  },
  created() {
    this.findAlluser({page:1,size:2});
    this.findByYema();
  },
  methods: {
    ...mapMutations('users', ['showModal', 'closeModal', 'setTitle']),
    ...mapActions('users', ['findAlluser','saveOrUpdateUsers','deleteUsersById', ]),
    // 普通方法
    handleSelectionChange(val) {
      this.ids = val.map(item => item.id)
    },
    toAddHandler() {
      // 1. 重置表单
      
      this.setTitle('添加用户信息')
      // 2. 显示模态框
      this.showModal()

    },
    submitHandler() {
      // 校验
      this.$refs.usersForm.validate((valid) => {
        // 如果校验通过
        if (valid) {
          var obj={usersinfo:this.usersinfo,yema:{page:this.page,size:this.size}}
          const promise = this.saveOrUpdateUsers(obj)
          promise.then((response) => {
            // promise为action函数的返回值，异步函数的返回值就是promise的then回调函数的参数
            this.$message({ type: 'success', message: response.statusText })
            this.usersinfo={role:{id:""}}
          })
        } else {
          return false
        }
      })
    },
    dialogCloseHandler() {
      this.$refs.usersForm.resetFields()
    },
    editHandler(row) {
      this.usersinfo = row
      this.setTitle('修改用户信息')
      this.showModal()
    },
    deleteHandler(id) {
      this.deleteUsersById({id,data:{page:this.page,size:this.size}})
        .then((response) => {
          this.$message({ type: 'success', message: response.statusText })
        })
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
        this.findAlluser(obj)
      },
    handleCurrentChange(val) {
        // this.page = val + 1 
        console.log(this.page)
    }
    // batchDeleteHandler() {
    //   this.batchDeleteusers(this.ids)
    //     .then((response) => {
    //       this.$message({ type: 'success', message: response.statusText })
    //     })
    // }

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
.users{
  padding: 1.5em
}
</style>
