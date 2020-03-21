const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const {connect , initSchemas} = require('./database/init.js')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors')

app.use(bodyparser())
app.use(cors())

let user = require('./appApi/user')
let goods = require('./appApi/goods')
let pet = require('./appApi/pet')
let cart = require('./appApi/cart')
let token = require('./appApi/token')
let sharepet = require('./appApi/sharepet')
let address = require('./appApi/address')
let orderservice = require('./appApi/orderservice')
let goodsorder = require('./appApi/goodsorder')
let comments = require('./appApi/comments')
let notice = require('./appApi/notice')
let admin = require('./appApi/admin')
let data = require('./appApi/data')

//装载所有子路由
let router = new Router()
router.use('/user',user.routes())
router.use('/goods',goods.routes())
router.use('/pet',pet.routes())
router.use('/cart',cart.routes())
router.use('/token',token.routes())
router.use('/sharepet',sharepet.routes())
router.use('/address',address.routes())
router.use('/orderservice',orderservice.routes())
router.use('/goodsorder',goodsorder.routes())
router.use('/comments',comments.routes())
router.use('/notice',notice.routes())
router.use('/admin',admin.routes())
router.use('/data',data.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

;(async () =>{
    await connect()
    initSchemas()
})()

app.use(async(ctx)=>{
    ctx.body='<h1>Hello Koa</h1>'
})

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})
