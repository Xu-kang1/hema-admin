import axios from 'axios'
import {Loading,Message} from 'element-ui'
import router from '../src/router/index'
// axios.defaults.baseURL = 'https://easy-mock.com/mock/5b42d9671337db27b1c03bdd/example'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.baseURL = 'http://tests.hemajf.com/adminsys'
// let href = window.location.href.split('://www')[1]
// if (href === undefined) {
//   axios.defaults.baseURL = 'http://test.hemajf.com/adminsys'
// }
// console.log(href)
var loadinginstace
axios.interceptors.request.use(config => {
// element ui Loading方法
  loadinginstace = Loading.service({ fullscreen: true })
  return config
}, error => {
  loadinginstace.close()
  Message.error({
  message: '加载超时'
  })
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(response => { // 响应成功关闭loading
  loadinginstace.close()
  return response
}, error => {
  loadinginstace.close()
  Message.error({
  message: '加载失败'
  })
  if (error.response) {
    switch (error.response.status) {
      case 401:
        sessionStorage.clear()
        router.replace({
          path: '/login',
          qurey: {redirect: router.currentRoute.fullPath}
        })
    }
  }
  return Promise.reject(error)
})
export default axios
