// import { post, get } from '@/utils/request'
import {get,post,post_json} from '../../http/axios'
import request from 'axios'

export default {
  namespaced: true,
  state: {
    user: [],
    visible: false,
    title: '添加用户信息',
    total:0,
  },
  getters: {
    userSize(state) {
      return state.user.length
    },
    // orderCategory: (state) => {
    //   return function(flag) {
    //     state.user.sort((a, b) => {
    //       if (a[flag] > b[flag]) {
    //         return -1
    //       } else {
    //         return 1
    //       }
    //     })
    //     return state.user
    //   }
    // }
  },
  mutations: {
    showModal(state) {
      state.visible = true
    },
    closeModal(state) {
      state.visible = false
    },
    refreshuser(state, user) {
      state.user = user
    },
    setTitle(state, title) {
      state.title = title
    },
    setTotal(state,total){
      state.total = total
    }
  },
  actions: {
    // async batchDeleteUser(context, ids) {
    //   // 1. 批量删除
    //   const response = await post('/category/batchDelete', { ids })
    //   // 2. 分发
    //   context.dispatch('findAlluser')
    //   // 3. 返回结果
    //   return response
    // },
    async deleteUsersById(context, mingcheng) {
      const response = await request.delete('/consumer/' + mingcheng.id)
      context.dispatch('findAlluser',mingcheng.data)
      return response
    },
    async findAlluser(context,data) {
      // 1. ajax查询
      const response = await get('/consumer?page='+data.page+"&size="+data.size)
      // console.log(response)
      // 2. 将查询结果更新到state中
      context.commit('refreshuser', response.data.data)
      context.commit('setTotal',response.data.total)
    },
    // payload 用户信息
    async saveOrUpdateUsers({ commit, dispatch }, payload) {
      console.log(payload.id)
      if(payload.id==undefined){
         // 1. 保存或更新
        const response = await post_json('/consumer', payload.usersinfo)
        // 2. 刷新页面
        dispatch('findAlluser',payload.yema)
        // 3. 关闭模态框
        commit('closeModal')
        // 4. 提示
        return response
      }else{
        const response = await request.put('/consumer/',payload.usersinfo)
        dispatch('findAlluser',payload.yema)
        commit('closeModal')
        return response
      }
     
    }
  }
}
