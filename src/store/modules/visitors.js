// import { post, get } from '@/utils/request'
import {get,post,post_json} from '../../http/axios'
import request from 'axios'

export default {
  namespaced: true,
  state: {
    visiter: [],
    visible: false,
    total:0,
  },
  getters: {
   
  },
  mutations: {
   
    setTotal(state,total){
      state.total = total
    },
    refreshVisitor(state, visiter) {
      state.visiter = visiter
    },

  },
  actions: {
    async findAllVisitor(context,data) {
      // 1. ajax查询
      const response = await get('/visitor?page='+data.page+"&size="+data.size)
      console.log(response)
      // 2. 将查询结果更新到state中
      context.commit('refreshVisitor', response.data.data)
      context.commit('setTotal',response.data.total)     
    },
 
   
  }
}
