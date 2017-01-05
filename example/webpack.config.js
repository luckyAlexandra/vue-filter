module.exports = {
  entry: './index.js',
  output: {
    path: './dist',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        // 让webpack去验证文件是否是.js结尾将其转换
        test: /\.js$/,
        // 通过babel转换
        loader: 'babel',
        // 不用转换的node_modules文件夹
        exclude: /node_modules/
      },
      {test: /\.html$/, loader: "html"},
      {test: /\.css$/, loader: "style!css"},
      {test: /\.styl$/, loader: "style!css!stylus"}
    ]
  },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        },
        extensions: ['', '.js', '.json', '.vue']
    }
}