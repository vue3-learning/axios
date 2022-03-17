import axios from 'axios'
import { userLogin } from '../utils/auth'
import { getCookie, delCookie } from '../utils/cookie'
import { useCancelToken } from './cancelToken'
import { useRetryRequest } from './retryRequest'
import httpSettings from '../settings/http'
const { retryRequestList} = httpSettings

const http = axios.create()
axios.defaults.withCredentials = true

httpSettings.cancelToken && useCancelToken(http)
httpSettings.retryRequest && useRetryRequest(http, {
  maxRetryTimes: 3,
  retryDelay: 400,
  retryRequestList
})

http.interceptors.request.use(async config => {
  console.log('http config', config)

  config.withCredentials = true

  const cookieToken = getCookie('token')
  if (!cookieToken) {
    await userLogin()
  }

  return config
}, error => {
  console.error('request error: ', error)
  Promise.reject(error)
})

http.interceptors.response.use(response => {
  console.log('http response', response)
  if (['10003', '10004'].includes(response.data.code)) { // 用户未登录或登录过期
    delCookie('token')
  }

  return response
}, error => {
  if (axios.isCancel(error)) {
    // 判断是否是手动用 axios CancelToken 取消的请求
    // todo something
  }
  console.error('response error: ', error)
  return Promise.reject(error)
})

export default http