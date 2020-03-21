const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const cartSchema = new Schema({
    goodsId:String,
    name:String,
    price:Number,
    image:String,
    count:Number,
    userId:String
},{
    collection:'cart'
})

mongoose.model('Cart',cartSchema)
