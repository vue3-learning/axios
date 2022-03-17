export const useRetryRequest = (axiosInstance, options) => {
  let i = 1

  axiosInstance.interceptors.response.use(response => {
    if (
      response.status === 200 &&
      i < (options.maxRetryTimes || 3) &&
      (options.retryRequestList || []).includes(response.config.url)
    ) {
      setTimeout(() => {
        axiosInstance(response.config)
        i++
        if (i >= (options.maxRetryTimes || 3)) {
          return response
        }
      }, options.retryDelay || 0)
    }
    return response

  })
}