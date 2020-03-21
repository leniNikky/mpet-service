const Router = require('koa-router')
const qiniu = require('qiniu')
const qnconfig = require('../config')

let router = new Router()
router.get('/getToken',async(ctx)=>{
    ctx.body = {code:200,message:qnconfig.uploadToken}
})

module.exports = router