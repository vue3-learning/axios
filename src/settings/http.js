export default {
  /**
   * @type {boolean} true | false
   * @description http是否开启 cancelToken 模式
   */
  cancelToken: true,

  /**
   * @type {boolean} true | false
   * @description http是否开启 错误自动重试 模式
   */
  retryRequest: true,

  /**
   * @type {Array} Array
   * @description 需要自动错误重试接口列表
   */
  retryRequestList: [
    '/merchant/welfare/section/productList'
  ]
}