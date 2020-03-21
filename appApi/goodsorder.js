const mongoose = require('mongoose')
const Router = require('koa-router')

let router = new Router()

router.post('/addGoodsOrder',async(ctx)=>{
    let GoodsOrder = mongoose.model('GoodsOrder')
    // let orderInfo = {orderTime:Date.now(),userId:'5c77ea03ada37a319493808a',
    //     goods:[
    //         {
    //             goodsId:'5c666770138f5a1c70fefabf',
    //             goodsName:'徐福记1250酥心糖桶600g/桶',
    //             goodsImg:'http://images.baixingliangfan.cn/shopGoodsImg/20180213/20180213110054_6547.jpg',
    //             goodsPrice:49.9,
    //             goodsCount:1
    //         },{
    //             goodsId:'5c666770138f5a1c70fefac0',
    //             goodsName:'星冰乐咖啡饮料原味281ml/瓶',
    //             goodsImg:'http://images.baixingliangfan.cn/shopGoodsImg/20180223/20180223091446_6102.jpg',
    //             goodsPrice:49.9,
    //             goodsCount:2
    //         }],
    //     addressInfo:{
    //         name:'叻妮',
    //         tel:'13917622293',
    //         address:'上海市 上海市 浦东新区 金海路2360号',
    //         areaCode:'201209'
    //     }
    // }
    let orderInfo = ctx.request.body
    let order =  new GoodsOrder(orderInfo)
    await order.save().then(()=>{
        ctx.body = {code:200,message:'插入成功'}
    }).catch(error=>{
        ctx.body = {code:500,message:'插入失败'}
    })
})

//查找某用户的所有订单
router.post('/findUserAllOrder',async(ctx)=>{
    try {
        let GoodsOrder = mongoose.model('GoodsOrder')
        let userId = ctx.request.body.userId
        let result = await GoodsOrder.find({userId:userId}).sort({orderTime:-1}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//查找某用户的未收货订单
router.post('/findUserOrderNotReceive',async(ctx)=>{
    try {
        const GoodsOrder = mongoose.model('GoodsOrder')
        let userId = ctx.request.body.userId
        let result = await GoodsOrder.find({userId:userId,logistics:{"$in":[0,1,2]}}).sort({orderTime:-1}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//查找所有商品订单
router.get('/findAllGoodsOrder',async(ctx)=>{
    try {
        const GoodsOrder = mongoose.model('GoodsOrder')
        let result = await GoodsOrder.find({}).sort({orderTime:-1}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//根据id查找订单
router.post('/findOrderByID',async(ctx)=>{
    try {
        const GoodsOrder = mongoose.model('GoodsOrder')
        id = ctx.request.body.id
        let result = await GoodsOrder.find({_id:id}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//根据订单状态查找订单
router.post('/findOrderByLogistics',async(ctx)=>{
    try {
        const GoodsOrder = mongoose.model('GoodsOrder')
        logistics = ctx.request.body.logistics
        let result = await GoodsOrder.find({logistics:logistics}).sort({orderTime:-1}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//确认收货
router.post('/confirmRecipt',async(ctx)=>{
    try {
        const GoodsOrder = mongoose.model('GoodsOrder') 
        let id =  ctx.request.body.id
        await GoodsOrder.updateOne({_id:id},{logistics:3}).exec()
        ctx.body = {code:200,message:'收货成功'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//查找单条订单记录
router.post('/findOneGoodsOrder',async(ctx)=>{
    try {
        const GoodsOrder = mongoose.model('GoodsOrder')
        id = ctx.request.body.id
        let result = await GoodsOrder.findOne({_id:id}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//商品订单已评论状态更改
router.post('/changeorderStatus',async(ctx)=>{
    try {
        const GoodsOrder = mongoose.model('GoodsOrder')
        id = ctx.request.body.id
        console.log(id)
        await GoodsOrder.updateOne({_id:id},{orderStatus:1}).exec()
        ctx.body = {code:200,message:'success'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//一键发货
router.post('/sendGoods',async(ctx)=>{
    try {
        const GoodsOrder = mongoose.model('GoodsOrder')
        id = ctx.request.body.id
        console.log(id)
        await GoodsOrder.updateOne({_id:id},{logistics:1}).exec()
        ctx.body = {code:200,message:'success'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

module.exports = router