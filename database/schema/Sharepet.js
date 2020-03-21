const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const shareSchema = new Schema({
    userId:String,
    shareDate:String,
    shareContent:String,
    shareImg:String,
})

mongoose.model('Sharepet',shareSchema)