const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const commentSchema = new Schema({
    goodsId:String,
    star:{type:Number,default:5},
    content:{type:String,default:'默认好评'},
    userName:String,
    userId:String,
    time:{type:Date,default:Date.now()},
    status:{type:Number,default:0}
})

mongoose.model('Comments',commentSchema)