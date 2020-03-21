const mongoose = require('mongoose')
const Router = require('koa-router')

let router = new Router()

//添加收货地址
router.post('/addAddress',async(ctx)=>{
    const Address = mongoose.model('Address')
    let address = new Address(ctx.request.body)
    await address.save().then(()=>{
        ctx.body = {code:200,message:'插入成功'}
    }).catch(error=>{
        ctx.body = {code:500,message:error}
        console.log(error)
    })
    
})

//查找该用户的所有收货地址
router.post('/getUserAddress',async(ctx)=>{
    try {
        const Address = mongoose.model('Address')
        let userId = ctx.request.body.userId
        let result = await Address.find({userId:userId}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }

})

//删除某个收货地址
router.post('/deleteAddress',async(ctx)=>{
    try {
        const Address = mongoose.model('Address')
        let addressId = ctx.request.body.addressId
        await Address.deleteOne({_id:addressId}).exec()
        ctx.body = {code:200,message:'删除成功'}
    } catch (error) {
        ctx.body = {code:500,message:'删除失败'}
        
    }
})

//修改收货地址
router.post('/editAddress',async(ctx)=>{
    try {
        const Address = mongoose.model('Address')
        let addressInfo = ctx.request.body
        await Address.update({_id:addressInfo.addressId},addressInfo).exec()
        ctx.body = {code:200,message:'修改成功'}
    } catch (error) {
        ctx.body = {code:500,message:'修改失败'}
    }
})

//查找单个收货地址
router.post('/findOneAddress',async(ctx)=>{
    try {
        const Address = mongoose.model('Address')
        let userId = ctx.request.body.userId
        let result = await Address.findOne({userId:userId}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

module.exports = router