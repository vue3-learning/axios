import axios from 'axios'
import { userLogin } from '../utils/auth'
import { getCookie, delCookie } from '../utils/cookie'

const http = axios.create()
axios.defaults.withCredentials = true

http.interceptors.request.use(async config => {
  console.log('http config', config)

  config.withCredentials = true

  const cookieToken = getCookie('token')
  if (!cookieToken) {
    await userLogin()
  }

  return config
})

http.interceptors.response.use(response => {
  console.log('http response', response)
  if (['10003', '10004'].includes(response.data.code)) { // 用户未登录或登录过期
    delCookie('token')
  }

  return response
})

export default http