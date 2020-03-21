const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const GoodsOrderSchema = new Schema({
    orderTime:{type:Date,default:Date.now()},
    userId:String,
    goods:Array,
    addressInfo:JSON,
    orderPrice:Number,
    orderStatus:{type:Number,default:0},
    logistics:{type:Number,default:0}//0:未发货，1：在路上，2：待收货，3：已收货
},{
    collection:'goods_order'
})

mongoose.model('GoodsOrder',GoodsOrderSchema)