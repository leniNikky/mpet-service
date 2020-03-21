const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()

//添加评论
router.post('/addComment',async(ctx)=>{
    const Comments = mongoose.model('Comments')
    let comment =  new Comments(ctx.request.body)
    await comment.save().then(()=>{
        ctx.body = {code:200,message:'success'}
    }).catch(error=>{
        ctx.body = {code:500,message:'fail'}
    })
})

//调取所有评论
router.get('/getAllComments',async(ctx)=>{
    try {
        const Comments = mongoose.model('Comments')
        let result = await Comments.find({}).sort({time:-1}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//审核评论
router.post('/changeCommentPass',async(ctx)=>{
    try {
        const Comments = mongoose.model('Comments')
        let id = ctx.request.body.id
        let status = ctx.request.body.status
        await Comments.updateOne({_id:id},{status:status}).exec()
        ctx.body = {code:200,message:'success'}
    } catch (error) {
        ctx.body = {code:500,message:'fail'}
    }
})

//查找某商品的所有评论
router.post('/findCommentsOfGoods',async(ctx)=>{
    try {
        const Comments = mongoose.model('Comments')
        let id = ctx.request.body.id
        console.log(id)
        let result = await Comments.find({goodsId:id}).sort({time:-1}).exec()  
        ctx.body = {code:200,message:result}   
    } catch (error) {
        ctx.body = {code:500,message:error} 
    }
})

//查找某商品的已通过审核的评论
router.post('/findCommentsIsOk',async(ctx)=>{
    try {
        const Comments = mongoose.model('Comments')
        let id = ctx.request.body.id
        console.log(id)
        let result = await Comments.find({goodsId:id,status:1}).sort({time:-1}).exec()  
        console.log(result)
        ctx.body = {code:200,message:result}   
    } catch (error) {
        ctx.body = {code:500,message:error} 
    }
})

//查找某状态的所有评论
router.post('/findCommentsByStatus',async(ctx)=>{
    try {
        const Comments = mongoose.model('Comments')
        let status = ctx.request.body.status
        let result = await Comments.find({status:status}).sort({time:-1}).exec()  
        ctx.body = {code:200,message:result}   
    } catch (error) {
        ctx.body = {code:500,message:error} 
    }
})


module.exports = router