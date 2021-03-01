'use strict'
const path = require('path')
module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/': {
                target: 'http://localhost:9001',//后端接口地址
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/': '/',//重写,
                }
            }
        }, 
        host: '192.168.0.104',
        port: 8081,
        autoOpenBrowser: false,
        errorOverlay: true,  
        notifyOnErrors: true,
        poll: false,
        useEslint: true,
        showEslintErrorsInOverlay: false,
        devtool: 'eval-source-map',
        cacheBusting: true,
        cssSourceMap: false,
    },
    OSS_PATH: 'jinronga.oss-cn-qingdao.aliyuncs.com'
}   