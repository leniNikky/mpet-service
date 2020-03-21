const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const orderServiceShema = new Schema({
    serviceId:String,
    userId:String,
    serviceName:String,
    servicePrice:String,
    serviceImg:String,
    userPhone:String,
    userName:String,
    orderTime:String,
    orderContent:String,
    orderStatus:{type:Number,default:0}
},{
    collection:'order_servcie'
})
mongoose.model('OrderService',orderServiceShema)