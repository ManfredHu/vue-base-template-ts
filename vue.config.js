const ImageMinPlugin = require('imagemin-webpack-plugin').default
const path = require('path')

module.exports = {
  devServer: {
    port: 9110,
    open: false, // npm run dev自动打开浏览器
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  css: {
    extract: false // css文件缓存 max-age=600，转化为js文件可以缓存更久
  },
  productionSourceMap: false, // 打包时不生成.map文件
  configureWebpack: config => {
    let opt = {}
    opt.module = {}
    opt.plugins = []
    opt.module.rules = [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          },
          // 为了不在每个vue文件引用文件，而是直接写！
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [
                path.resolve(
                  __dirname,
                  './src/style/base/import.variables.less'
                )
              ]
            }
          }
        ]
      }
    ]

    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      opt.plugins.push(
        new ImageMinPlugin({
          disable: false, // Disable during development
          pngquant: {
            quality: '70-95'
          }
        })
      )
    } else {
      // 为开发环境修改配置...
    }
    return opt
  },
  chainWebpack: config => {
    // config.plugins.delete('preload') // preload会预加载公共包，尽量保留
    config.plugins.delete('prefetch') // prefetch会预加载异步的包，不需要
    config.resolve.alias.set('@', path.join(__dirname, 'src'))
  }
}
