const mongoose = require('mongoose')
const Router = require('koa-router')

let router = new Router()

//添加公告
router.post('/addNotice',async(ctx)=>{
    const Notice = mongoose.model('Notice')
    let notice = new Notice(ctx.request.body)
    await notice.save().then(()=>{
        ctx.body = {code:200,message:'添加成功'}
    }).catch(error=>{
        ctx.body = {code:500,message:error}
    })
})

//查找所有公告
router.get('/getAllNotice',async(ctx)=>{
    try {
        const Notice = mongoose.model('Notice')
        let result = await Notice.find({}).sort({time:-1}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//删除公告
router.post('/deleteNotice',async(ctx)=>{
    try {
        const Notice = mongoose.model('Notice')
        let id = ctx.request.body.id
        await Notice.deleteOne({_id:id}).exec()
        ctx.body = {code:200,message:'删除成功'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//查找最新的三条公告
router.get('/getThreeNotice',async(ctx)=>{
    try {
        const Notice = mongoose.model('Notice')
        let result = await Notice.find({}).sort({time:-1}).limit(3).exec()
        console.log(result)
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

module.exports = router