const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const AddressSchema = new Schema({
    userId:String,
    name:String,
    tel:String,
    address:String,
    isDefault:Boolean,
    province:String,
    city:String,
    county:String,
    addressDetail:String,
    areaCode:String,
    chosenStatus:Number
},{
    collection:'address'
})

mongoose.model('Address',AddressSchema)