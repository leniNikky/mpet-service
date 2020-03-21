const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const categorySubSchema = new Schema({
    MALL_CATEGORY_ID:String,
    MALL_SUB_NAME:String,
    SORT:Number
},{
    collection:'category_sub'
})

mongoose.model('Category_sub',categorySubSchema)