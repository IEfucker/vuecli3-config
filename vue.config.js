const path = require('path')
const apiMocker = require('webpack-api-mocker')
const cookieParser = require('cookie-parser')

// const isProduction = process.env.NODE_ENV === 'production'
let config = {
  // 关闭 eslint 语法检查
  // lintOnSave: false,
  // chainWebpack: config => config.plugins.delete('named-chunks'),

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: false,
  baseUrl: '/mp',
  transpileDependencies: ['vue-scrollto'],
  // script error
  // chainWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     config
  //       .plugin('uglify')
  //       .tap(([options]) => {
  //         // 去除 console.log
  //         return [Object.assign(options, {
  //           uglifyOptions: { compress: {
  //             drop_console: true,
  //             pure_funcs: ['console.log']
  //           } }
  //         })]
  //       })
  //   }
  // },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      // 指定node_modules的位置
      modules: [path.resolve(__dirname, 'node_modules')],
      alias: {
        // 创建别名
        // 'api': resolve('src/api'),
        vue$: 'vue/dist/vue.esm.js'
      }
    },
    optimization: {
      splitChunks: {
        // chunks: 'async',
        // minSize: 20000,
        // maxSize: 30000,
        // minChunks: 1,
        // maxAsyncRequests: 5,
        // maxInitialRequests: 3,
        // automaticNameDelimiter: '~',
        // name: true,
        // cacheGroups: {
        //   vendors: {
        //     test: /[\\/]node_modules[\\/]/,
        //     priority: -10
        //   },
        //   default: {
        //     minChunks: 2,
        //     priority: -20,
        //     reuseExistingChunk: true
        //   }
        // }
      }
    }
  },

  // webpack-dev-server 相关配置
  devServer: {
    hot: true,
    open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    disableHostCheck: true
  },

  // webpack analyzer
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  }
}

console.log(process.env.NODE_ENV)
if (process.env.NO_PROXY === 'true') {
  config.devServer = {
    ...config.devServer,
    proxy: {
      '/v1/user/': {
        target: 'http://test.test.com/',
        // pathRewrite: { '^/v1/user/': '' },
        secure: false,
        changeOrigin: true,
        // 注：ie下设置localhost的cookie无效，改为空，与网页域名一致，待测试
        cookieDomainRewrite: {
          'test.com': ''
        }
      },
      '/stream/': {
        target: 'http://test.test.com/',
        // pathRewrite: { '^/user/': '' },
        secure: false,
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  }
} else {
  config.devServer = {
    ...config.devServer,
    before (app) {
      app.use(cookieParser())
      apiMocker(app, path.resolve('./mock/index.js'), {
        proxy: {
          '/repos/*': 'https://api.github.com/'
        },
        changeHost: true
      })
    }
  }
}

module.exports = config
