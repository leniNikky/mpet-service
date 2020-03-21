const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.post('/insertCartInfo',async(ctx)=>{
    const Cart = mongoose.model('Cart')
    let cartInfo = new Cart(ctx.request.body)
    await cartInfo.save().then(()=>{
        ctx.body = {code:200,message:'插入成功'}
    }).catch(error=>{
        ctx.body={code:500,message:'插入失败'}
    })
    // try {
    //     const Cart = mongoose.model('Cart')
    //     let cartInfo = {goodsId:'123',name:'123',price:'123',image:'123',count:1,userId:'123'}
    //     console.log(cartInfo)
    //     await Cart.insertMany(cartInfo).exec()
    //     ctx.body = {code:200,message:'插入成功'}
    // } catch (error) {
    //     ctx.body = {code:500,message:'插入失败'}
    // }
})

//查找购物车内容
router.post('/findCartInfo',async(ctx)=>{
    try {
        const Cart = mongoose.model('Cart')
        let userId =  ctx.request.body.userId
        let result = await Cart.find({userId:userId}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//删除购物车内容
router.post('/deleteCartInfo',async(ctx)=>{
    try {
        const Cart = mongoose.model('Cart')
        let userId = ctx.request.body.userId
        let result = await Cart.deleteMany({userId:userId}).exec()
        ctx.body = {code:200,message:'删除成功'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//删除单条购物车记录
router.post('/deleteOneCartInfo',async(ctx)=>{
    try {
        const Cart = mongoose.model('Cart')
        let cartId = ctx.request.body.cartId
        let result = await Cart.deleteOne({_id:cartId}).exec()
        ctx.body = {code:200,message:'删除成功'}
    } catch (error) {
        ctx.body = {code:500,message:'删除失败'}
    }
})

//删除购物车里已付款的商品
router.post('/deleteGoodsInCart',async(ctx)=>{
    try {
        const Cart = mongoose.model('Cart')
        let cartId = ctx.request.body.cartId
        await Cart.deleteOne({_id:cartId}).exec()
        ctx.body = {code:200,message:'删除成功'}
    } catch (error) {
        ctx.body = {code:500,message:'删除失败'}
    }
})

//删除购物车里已付款的商品
router.post('/deleteGoodsOfNone',async(ctx)=>{
    try {
        const Cart = mongoose.model('Cart')
        let goodsId = ctx.request.body.goodsId
        await Cart.deleteOne({goodsId:goodsId}).exec()
        ctx.body = {code:200,message:'删除成功'}
    } catch (error) {
        ctx.body = {code:500,message:'删除失败'}
    }
})

module.exports = router