import axios from 'axios'
import qs from 'qs'
import {
  Indicator,
  MessageBox
} from 'mint-ui'

import router from '../router/index'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.baseURL = 'http://api.front.com';
axios.defaults.timeout = 50000

/*
 *  若需拦截器可在此封装
 */
axios.interceptors.response.use(function (res) {
  // Do something with response data
  if (res.data.code === 503) {
    return new Promise((resolve, reject) => {
      MessageBox({
        title: '提示',
        message: res.data.msg,
        showCancelButton: false,
        showConfirmButton: false
      })
      resolve('成功')
    }).then((value) => {
      router.push(`/404?msg=${res.data.msg}`)
      // window.location = 'http://127.0.0.1:8080/#/login';
    })
  }

  return res
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})
// 返回一个Promise
export function fetch (url, params, type) {
  params = Object.assign({}, params)
  return new Promise((resolve, reject) => {
    if (type === 'post') {
      // 因后台post请求需form-data传参，所以使用qs.stringify
      axios.post(url, qs.stringify(params))
        .then(response => {
          if (response.data.code === 401) {
            router.push('login')
          }
          resolve(response.data)
        }, err => {
          Indicator.close()
          // Toast('网络故障，请稍后再试')
          reject(err)
          localStorage.setItem({
            'err': err
          })
        })
        .catch((error) => {
          reject(error)
        })
    } else {
      axios.get(url, { params })
        .then(response => {
          resolve(response.data)
        }, err => {
          Indicator.close()
          // Toast('网络故障，请稍后再试')
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    }
  })
}
