// axios 配置

import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://api.imooc.hybrid.lgdsunday.club/'

/**
 * 所有的请求头拦截器
 */

axios.interceptors.request.use(config => {
  if (config.params) {
    config.params.token = '05161ec0-055b-11ea-acd3-7b90f1eac841'
  } else {
    config.params = {
      token: '05161ec0-055b-11ea-acd3-7b90f1eac841'
    }
  }
  return config
})
/**
 * 设置拦截器 ，interceptor 响应处理
 * 所有使用 axios 的请求响应，都会优先回调到拦截器中
 */

axios.interceptors.response.use(
  response => {
    // 统一处理
    return response.data.data
  },
  error => {
    return Promise.reject(error)
  }
)

Vue.prototype.$http = axios
