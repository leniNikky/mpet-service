const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.get('/addAdmin',async(ctx)=>{
    const Admin = mongoose.model('Admin')
    let admin = new Admin({name:'Nikky',password:'zyn2019'})
    console.log(admin)
    await admin.save().then(()=>{
        ctx.body = {code:200,message:'success'}
    }).catch(error=>{
        ctx.body = {code:500,message:'fail'}
    })
})

router.post('/login',async(ctx)=>{
    //得到前端传递过来的数据
    let loginUser = ctx.request.body
    let name = loginUser.name
    let password = loginUser.password
    //引入User的model
    const Admin = mongoose.model('Admin')
    //查找用户名是否存在，如果存在开始比对密码
   await Admin.findOne({name:name}).exec().then(async(result)=>{
        if(result){
           //console.log(User)
            //当用户名存在时，开始比对密码
            let newUser = new Admin()  //因为是实例方法，所以要new出对象，才能调用
            await newUser.comparePwd(password,result.password)
            .then( (isMatch)=>{
                //返回比对结果
                if(isMatch){
                    console.log(result)
                    ctx.body = {code:200,message:result}
                }else{
                    ctx.body = {code:200,message:isMatch}
                }
            })
            .catch(error=>{
                //出现异常，返回异常
                console.log(error)
                ctx.body={ code:500, message:error}
            })
        }else{
            ctx.body={ code:200, message:'用户不存在'}
        }
    }).catch(error=>{
        console.log(error)
        ctx.body={ code:500, message:error  }
    })
})


module.exports = router