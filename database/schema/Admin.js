const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectID = Schema.Types.ObjectId
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const adminSchema = new Schema({
    name:String,
    password:String
},{
    collection:'admin'
})

adminSchema.pre('save',function(next){
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err)
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) return next(err)
            this.password = hash
            next()
        })
    })
})

adminSchema.methods = {
    //密码比对
    comparePwd:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}

mongoose.model('Admin',adminSchema)