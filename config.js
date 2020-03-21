/*
七牛云配置
*/
const qiniu = require('qiniu')

// 创建上传凭证
const accessKey = 'cOwtgXns8lOjR6fbA-5UzXS4y_CrkwQlwwS8fPP4'
const secretKey = 'UfOZhK6hfWqJn-OQZ1kJrZtVmVk8RrdxsmVBSWk-'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: 'leni',
  expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.exports = {
  uploadToken
}