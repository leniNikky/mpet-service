const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()

router.get('/getData',async(ctx)=>{
    try {
        const User = mongoose.model('User')
        let mpetData = {}
        mpetData.userCount = await User.count({})
        const Orders = mongoose.model('GoodsOrder')
        let orders = await Orders.find({}).exec()
        mpetData.orderMoney = 0
        const Goods = mongoose.model('Goods')
        mpetData.goodsCount = await Goods.count({})
        orders.forEach((item)=>{
            mpetData.orderMoney+=item.orderPrice
        })
        mpetData.goods = await Goods.find({}).sort({SALES_COUNT:-1}).limit(5).exec()
        const Pet = mongoose.model('Pet')
        let pets = await Pet.find({}).exec()
        mpetData.catCount = 0
        mpetData.dogCount = 0
        pets.forEach(item=>{
            if(item.pet_class == '猫'){
                mpetData.catCount++
            }else{
                mpetData.dogCount++
            }
        })
        ctx.body = {code:200,message:mpetData}
    } catch (error) {
        ctx.body = {code:200,message:error}
    }
})

module.exports = router