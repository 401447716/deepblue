const path = require('path')

module.exports = {
  jsx: 'vue',
  outputDir: path.resolve(__dirname, '../output'),
  px2rem: false,
  autopolyfill: true,
  plugins: []
}
