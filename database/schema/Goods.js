const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const goodsSchema = new Schema({
    GOODS_ID:ObjectId,
    GOOD_TYPE:String,
    STATE:{type:Number,default:1},
    NAME:String,
    ORI_PRICE:{type:Number,default:0},
    PRESENT_PRICE:Number,
    AMOUNT:{type:Number,default:1},
    DETAIL:String,
    SALES_COUNT:{type:Number,default:0},
    IMAGE1:String,
    IMAGE2:String,
    IMAGE3:String,
    IMAGE4:String,
    IMAGE5:String,
    CREATE_TIME: {type:Date,default:Date.now()},
    UPDATE_TIME: {type:Date,default:Date.now()},
    IS_RECOMMEND:Number,
    ANIMAL_TYPE:{type:Number,default:1},
    CATEGORY_NAME:String,
    SUB_ID:String,
    CAT_ID:String
},{
    collection:'goods'
})
mongoose.model('Goods',goodsSchema)