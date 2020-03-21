const mongoose = require('mongoose')
const Router = require('koa-router')
let router = new Router()

//插入分享内容
router.post('/insertShare',async(ctx)=>{
    const Sharepet = mongoose.model('Sharepet')
    let shareInfo = new Sharepet(ctx.request.body)
    await shareInfo.save().then(()=>{
        ctx.body = {code:200,message:'插入成功'}
    }).catch(error=>{
        ctx.body = {code:500,message:error}
    })
})

//查找所有宠圈内容
router.get('/findAllShare',async(ctx)=>{
    try {
        const Sharepet = mongoose.model('Sharepet')
        let result = await Sharepet.find({}).sort({shareDate:-1}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }

})

//查找个人的宠圈记录
router.post('/findPersonShare',async(ctx)=>{
    try {
        const Sharepet = mongoose.model('Sharepet')
        let userId = ctx.request.body.userId
        let result = await Sharepet.find({userId:userId}).sort({shareDate:-1}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//删除单条记录
router.post('/deteleShare',async(ctx)=>{
    try {
        const Sharepet = mongoose.model('Sharepet')
        let shareId = ctx.request.body.shareId
        await Sharepet.deleteOne({_id:shareId}).exec()
        ctx.body = {code:200,message:'删除成功'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//查找宠圈
router.post('/searchCqByName',async(ctx)=>{
    try {
        const Sharepet = mongoose.model('Sharepet')
        let searchInfo = ctx.request.body.searchInfo
        let result = await Sharepet.find({shareContent:{$regex: searchInfo}})
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})
module.exports = router