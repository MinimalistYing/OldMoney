module.exports = {
  pages: {
    index: {
      entry: 'client/src/main.js',
      template: 'client/public/index.html'
    }
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
