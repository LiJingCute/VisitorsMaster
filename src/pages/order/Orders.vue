<template>
  <div class="order">
    {{orderForm}}
    <h2>访客预约</h2>
    <div>
     <el-form ref="orderinfo" :rules="rules"  :model="orderForm" label-width="80px">
        <el-form-item label="访客姓名" prop="visitor">
            <el-input v-model="orderForm.visitor"></el-input>
        </el-form-item>
        <el-form-item label="访客电话">
            <el-input v-model="orderForm.phone" prop="phone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="被访问人姓名" prop="consumer">
            <el-input v-model="orderForm.consumer.name"></el-input>
        </el-form-item>
        <el-form-item label="被访问人电话" prop="consumer">
            <el-input v-model="orderForm.consumer.phone"></el-input>
        </el-form-item> -->
        <el-form-item label="访问原因" prop="reason">
            <el-input type="textarea" v-model="orderForm.reason"></el-input>
        </el-form-item>
        <el-form-item label="访问时间">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              @change="dataChange"
              range-separator="至"
              start-placeholder="开始预约日期"
              value-format="yyyy-MM-dd HH:mm"
              end-placeholder="结束预约日期">
            </el-date-picker>
        </el-form-item>
        
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即预约</el-button>
        </el-form-item>
     </el-form>
    </div>
    <div>
     
    </div>
   
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
 export default {
    data() {
      return {
         value1:'',
         orderForm:{
           visitor:"",
           phone:"",
           start:"",
           end:"",
           customer:{
             id:"",
             name:"",
             phone:"",
           }
         },
        rules: {
          visitor: [
            { required: true, message: '请输入访客名字', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2到 10 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          start: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          end: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          reason: [
            { required: true, message: '请选择访问原因', trigger: 'blur' }
          ]
        }
      
         
      }
    },
    computed: {
        ...mapState('orders', ['orderVisitor ']),
    },
    methods: {
      ...mapActions('orders',['saveOrUpdate']),
      dataChange(val){
        this.start=val;
        this.end=val;
        console.log(start)
        console.log(end)
      },
      onSubmit() {
        // 校验
        this.$refs.orderinfo.validate((valid) => {
          // 如果校验通过
          if (valid) {
            var obj={
              orderForm:this.orderForm
            }
            const promise = this.saveOrUpdate(obj)
            promise.then((response) => {
              // promise为action函数的返回值，异步函数的返回值就是promise的then回调函数的参数
              this.$message({ type: 'success', message: response.statusText })
              this.orderForm={consumer:{id:""}}
            })
          } else {
            return false
          }
        })
      },
    }
  }
</script>
<style scoped>
.order{
  padding: 1.5em
}
</style>
