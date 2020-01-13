// import { post, get } from '@/utils/request'
import {get,post,post_json} from '../../http/axios'
import request from 'axios'

export default {
  namespaced: true,
  state: {
   
  },
  getters: {
   
  },
  mutations: {

  },
  actions: {
    
      async saveOrUpdate(context, params) {
        let response = await post_json('/visitor',params)
        console.log("qqqq",reponse);
        return response;
    },
   
  }
}
