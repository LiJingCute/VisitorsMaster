import axios from 'axios'
import qs from 'qs'
// import { Toast } from 'vant'

// 全局配置
// axios.defaults.headers.common["token"] = ""
// axios.defaults.headers.post["Content-Type"] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://10.0.0.158:9999'

// Add a response interceptor
axios.interceptors.response.use(function(response) {
  // 将后台的参数结果设置到response
  // console.log(response.data,'aaaaa')
  // response.data=response.reject.response
  // response.status = response.status
  // response.statusText = data.message
  // 统一异常处理
  if (response.data.status !== 200) {
    // Toast(data.message)
    
    return Promise.reject(response.data.message)
  }
  return response
}, function(error) {
  // Toast('网络异常')
  return Promise.reject(error)
})

/**
  get方式请求
*/
export function get(url, params) {
  return axios({
    method: 'get',
    url,
    params, // get 请求时带的参数
    timeout: 10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
}

/**
 * 提交post请求 发送的数据为查询字符串，key=val&key=val
*/
export function post(url, data) {
  return axios({
    method: 'post',
    url,
    data: qs.stringify(data),
    timeout: 10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}

/**
 * 提交post请求 发送的数据为查询字符串，当参数为数组的时候适用该方法
 * ids=1&ids=2
*/
export function post_array(url, data) {
  return axios({
    method: 'post',
    url,
    data: qs.stringify(data, { arrayFormat: 'repeat' }),
    timeout: 10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}
/**
 * 提交post请求 发送的数据为json字符串
*/
export function post_json(url, data) {
  return axios({
    method: 'post',
    url,
    data,
    timeout: 10000
  })
}

export default axios
