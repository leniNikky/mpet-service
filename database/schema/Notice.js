const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const noticeSchema = new Schema({
    time:{type:Date,default:Date.now()},
    content:String
},{
    collection:'notice'
})

mongoose.model('Notice',noticeSchema)