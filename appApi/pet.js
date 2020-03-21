const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

//添加宠物信息
router.post('/insertPetInfo',async(ctx)=>{
    const Pet = mongoose.model('Pet')
    let pet = new Pet(ctx.request.body)
    await pet.save().then(()=>{
        ctx.body={
            code:200,
            message:'添加成功'
        }
    }).catch(error=>{
        ctx.body = {
            code:500,
            message:error
        }
    })

})

//查找宠物信息
router.post('/findPetInfo',async(ctx)=>{
    try {
        let ownerId = ctx.request.body.ownerId
        const Pet = mongoose.model('Pet')
        let result = await Pet.findOne({owner_id:ownerId}).exec()
        console.log(ownerId)
        console.log(result)
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//修改宠物信息
router.post('/alterPetInfo',async(ctx)=>{
    try {
        let petInfo = ctx.request.body
        console.log(petInfo._id)
        const Pet = mongoose.model('Pet')
        let result = await Pet.update({'_id':petInfo._id},petInfo).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

module.exports = router