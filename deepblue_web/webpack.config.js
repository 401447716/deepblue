/**
 * 不是真实的 webpack 配置，仅为兼容 webstorm 和 intellij idea 代码跳转与自动 import
 */

const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
}
