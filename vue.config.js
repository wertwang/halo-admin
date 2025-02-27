const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  publicPath: process.env.PUBLIC_PATH,
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    port: 8080,
    disableHostCheck: true, // 可使用本地host配置的域名访问
    proxy: {
      '/': {
        // agent: new ProxyAgent('http://127.0.0.1:8090'),
        target: 'http://127.0.0.1:8090/',
        ws: false,
        changeOrigin: true
      }
    }
  },
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: [],
  productionSourceMap: false
}
