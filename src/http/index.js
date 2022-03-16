import axios from 'axios'

const http = axios.create()

http.interceptors.request.use(config => {
  console.log(config)
  return config
})

http.interceptors.response.use(response => {
  return response
})

export default http