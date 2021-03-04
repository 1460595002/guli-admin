'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  BASE_API: 'http://localhost:9001',
  // OSS_PATH: 'oss-cn-qingdao.aliyuncs.com'


  // nginx中的配置信息
//   server {
//     listen       9001;
//     server_name  localhost;
//
//        location ~ /eduservice/ {
//        proxy_pass http://localhost:8001;
//      }
//        location ~ /eduoss/ {
//        proxy_pass http://localhost:8002;
//     }

}) 