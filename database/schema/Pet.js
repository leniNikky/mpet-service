const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const petSchema = new Schema({
    pet_id:ObjectId,
    pet_name:String,
    pet_img:String,
    pet_birth: {type:Date,default:Date.now()},
    pet_class:String,
    pet_classSub:String,
    pet_sex:{type:String,default:'1'},
    owner_id:String
},{
    collection:'pet'
})

mongoose.model('Pet',petSchema)