const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema=new Schema({
    type:Number,
    user_id:String,
    avatar:String,
    number:Number
},{
    collection:'employee'
})
mongoose.model('Employee',employeeSchema)