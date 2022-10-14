'use strict'
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const IS_PROD = process.env.NODE_ENV == 'production'
module.exports = {
  publicPath: IS_PROD ? process.env.BASE_URL : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require('os').cpus().length > 1,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, '@/styles/utils.scss'),
        path.resolve(__dirname, '@/styles/mixins.scss'),
      ],
    },
  },
  devServer: {
    allowedHosts: "all",
    proxy: {
      '/api': {
        target: 'https://dev-jiangshan-jsc-apiweb.hzanchu.com', // 目标代理接口地址
        secure: false,
        changeOrigin: true,
      },
      '/admin': {
        target: 'https://dev-jiangshan-tzyjs-apiadmini.hzanchu.com', // 目标代理接口地址
        secure: false,
        changeOrigin: true,
      },
      '/algorithm_api': {
        target: 'https://jiangshan-ai.zjsszxc.com', // 目标代理接口地址
        secure: false,
        changeOrigin: true,
      },
      '/jiangshan-api': {
        target: 'https://dev-fenghua-jec-apijava.hzanchu.com', // 目标代理接口地址
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '/jiangshan-api': '/api'
        }
      },
      '/jiangshan-jsc': {
        target: 'https://jiangshan-jsc-jsc.zjsszxc.com', // 主要包括模块：气象资源
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '/jiangshan-jsc': '/jiangshan-api'
        }
      },
    },
  },
  chainWebpack(config) {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: ['./src/styles/utils.scss'],
        })
        .end()
    })
  },
  configureWebpack: config => {
    if (IS_PROD) {
      // 生产环境打包删除console
      // config.optimization = {
      //   minimizer: [
      //     new TerserPlugin({
      //       terserOptions: {
      //         compress: {
      //           drop_console: true,
      //         },
      //       },
      //     }),
      //   ],
      // }
    }
    Object.assign(config.resolve, {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    })
  },
}
