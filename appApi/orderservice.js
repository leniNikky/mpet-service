const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

//添加一条服务预约
router.post('/addOrderService',async(ctx)=>{
    const OrderService = mongoose.model('OrderService')
    let orderInfo =new OrderService(ctx.request.body)
    await orderInfo.save().then(()=>{
        ctx.body = {code:200,message:'插入成功'}
    }).catch(error=>{
        ctx.body = {code:500,message:'插入失败'}
    })
})

//删除一条预约
router.post('/deleteOrderService',async(ctx)=>{
    try {
        const OrderService = mongoose.model('OrderService')
        let serviceId = ctx.request.body.serviceId
        let userId = ctx.request.body.userId
        await OrderService.deleteOne({serviceId:serviceId,userId:userId}).exec()
        ctx.body = {code:200,message:'删除成功'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//查找是否已经预约过
router.post('/findIfOrdered',async(ctx)=>{
    try {
        const OrderService = mongoose.model('OrderService')
        let serviceId = ctx.request.body.serviceId
        let userId = ctx.request.body.userId
        let result = await OrderService.find({serviceId:serviceId,userId:userId,orderStatus:0}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//查找用户所有的预约记录
router.post('/findMyServiceOrders',async(ctx)=>{
    try {
        const OrderService = mongoose.model('OrderService')
        let userId = ctx.request.body.userId
        let result = await OrderService.find({userId:userId}).sort({orderTime:-1}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//查找某用户待服务的预约
router.post('/findServiceOrdersIng',async(ctx)=>{
    try {
        const OrderService = mongoose.model('OrderService')
        let userId = ctx.request.body.userId
        let result = await OrderService.find({userId:userId,orderStatus:0}).sort({orderTime:-1}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//查找所有服务订单
router.get('/findAllServiceOrder',async(ctx)=>{
    try {
        const ServiceOrder = mongoose.model('OrderService')
        let result = await ServiceOrder.find({}).sort({orderTime:-1}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//根据id查找订单
router.post('/findServiceOrderByID',async(ctx)=>{
    try {
        const ServiceOrder = mongoose.model('OrderService')
        id = ctx.request.body.id
        let result = await ServiceOrder.find({_id:id}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//根据订单状态查找订单
router.post('/findServiceOrderByLogistics',async(ctx)=>{
    try {
        const ServiceOrder = mongoose.model('OrderService')
        orderStatus = ctx.request.body.orderStatus
        let result = await ServiceOrder.find({orderStatus:orderStatus}).sort({orderTime:-1}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//将订单状态改为已结束
router.post('/changeServiceOrderStatus',async(ctx)=>{
    try {
        const ServiceOrder = mongoose.model('OrderService')
        let id = ctx.request.body.id
        await ServiceOrder.updateOne({_id:id},{orderStatus:1}).exec()
        ctx.body = {code:200,message:'success'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

module.exports = router