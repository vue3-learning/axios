/**
 * 需求: 当分页请求时, 当新的请求发出, 自动中断上一次的请求
 * 
 * 使用 axios 的 cancelToken 来实现 http://www.axios-js.com/zh-cn/docs/#取消
 * 
 * 每次请求根据请求的 config 的 url 和 method 生成一个 cancelToken, 并将对应的 cancel 方法存起来
 * 当有同样的方法请求过来后, 通过 url 和 method  拿出 cancel 方法并调用
 * 这样就可以取消前一次还没返回的相同请求, 页面也不会响应, 保证页面一段时间内只会响应最后一次重复请求 
 */

import axios from 'axios'
const pending = new Map()

/**
 * 添加请求进入pending队列
 * @param {Object} config 请求的配置
 */
export const addPending = config => {
  const url = [config.method, config.url].join('&')
  config.cancelToken = new axios.CancelToken(cancel => {
    if (!pending.has(url)) {
      pending.set(url, cancel)
    }
  })
}

/**
 * 从 pending 队列中移除请求
 * @param {Object} config 请求的配置
 */
export const delPending = config => {
  const url = [config.method, config.url].join('&')
  // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
  if (pending.has(url)) {
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}

/**
 * 清空 pending 队列中的所有请求
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}

export const useCancelToken = axiosInstance => {
  axiosInstance.interceptors.request.use(config => {
    delPending(config)
    addPending(config)
    return config
  })

  axiosInstance.interceptors.response.use(response => {
    delPending(response.config)

    return response
  })
}