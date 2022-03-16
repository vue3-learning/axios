'use strict'

module.exports = {
  devServer: {
    port: 8081,
    open: true,
    proxy: {
      '/merchant': {
        target: 'https://www.lujaja.com/ecp/u5/merchant',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/merchant': ''
        }
      }
    }
  }
}