const Router = require('koa-router')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

let router = new Router()
router.get('/',async(ctx)=>{
    ctx.body="这是操作用户首页"
})

router.post('/register',async(ctx)=>{
    //取得Model
    const User = mongoose.model('User')
    //把从前端接收的POST数据封装成一个新的user对象
    let newUser = new User(ctx.request.body)
    //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
    await newUser.save().then(()=>{
        //成功返回code=200，并返回成功信息
        ctx.body={
            code:200,
            message:'注册成功'
        }
    }).catch(error=>{
         //失败返回code=500，并返回错误信息
        ctx.body={
            code:500,
            message:error
        }
    })
})

router.post('/checkIfRegistered',async(ctx)=>{
    try {
        const User = mongoose.model('User')
        let phone = ctx.request.body.phone
        let result = await User.findOne({phone:phone}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

router.post('/login',async(ctx)=>{
    //得到前端传递过来的数据
    let loginUser = ctx.request.body
    let phone = loginUser.phone
    let password = loginUser.password
    //引入User的model
    const User = mongoose.model('User')
    //查找用户名是否存在，如果存在开始比对密码
   await User.findOne({phone:phone}).exec().then(async(result)=>{
        if(result){
           //console.log(User)
            //当用户名存在时，开始比对密码
            let newUser = new User()  //因为是实例方法，所以要new出对象，才能调用
            await newUser.comparePwd(password,result.password)
            .then( (isMatch)=>{
                console.log(isMatch)
                //返回比对结果
                if(isMatch){
                    User.updateOne({_id:result._id},{lastLoginAt:Date.now()}).exec()
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
            ctx.body={ code:500, message:'用户不存在'}
        }
    }).catch(error=>{
        console.log(error)
        ctx.body={ code:500, message:error  }
    })
})

//登录之后调取用户信息
router.post('/getUserInfo',async(ctx)=>{
    try {
        let phone = ctx.request.body.phone
        const User = mongoose.model('User')
        let result = await User.findOne({phone:phone}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//查收一个用户信息
router.post('/findUserInfo',async(ctx)=>{
    try {
        const User = mongoose.model('User')
        let id = ctx.request.body.id
        let result = await User.findOne({_id:id}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//更换头像
router.post('/changeUserImg',async(ctx)=>{
    try {
        const User = mongoose.model('User')
        let userId = ctx.request.body.userId
        let userImg = ctx.request.body.userImg
        await User.update({_id:userId},{userImg:userImg}).exec()
        ctx.body = {code:200,message:'更换成功'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//修改用户个人信息
router.post('/changeUserInfo',async(ctx)=>{
    try {
        const User = mongoose.model('User')
        let userId = ctx.request.body.userId
        let phone = ctx.request.body.phone
        let userName = ctx.request.body.userName
        await User.update({_id:userId},{phone:phone,userName:userName}).exec()
        ctx.body = {code:200,message:'修改成功'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//检查密码输入是否正确
router.post('/checkOldPwd',async(ctx)=>{
    const User = mongoose.model('User')
    let newUser = new User()  //因为是实例方法，所以要new出对象，才能调用
    let userId = ctx.request.body.userId
    let result = await User.findOne({_id:userId}).exec()
    let password = ctx.request.body.password
    await newUser.comparePwd(password,result.password)
    .then( (isMatch)=>{
        //返回比对结果
        ctx.body = {code:200,message:isMatch}
    })
    .catch(error=>{
        //出现异常，返回异常
        console.log(error)
        ctx.body={ code:500, message:error}
    })
})

//修改用户密码
router.post('/changeUserPwd',async(ctx)=>{
    try {
        const User = mongoose.model('User')
        let userId = ctx.request.body.userId
        let password = ctx.request.body.password
        bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
            bcrypt.hash(password,salt,(err,hash)=>{
                password = hash
            })
        })
        await setTimeout(() => {
            console.log(password)
            User.updateOne({_id:userId},{password:password}).exec()
        }, 1000);
        ctx.body = {code:200,message:'修改成功'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//修改用户信息后，重新调取用户信息
router.post('/updateUserInfo',async(ctx)=>{
    try {
        const User = mongoose.model('User')
        let userId = ctx.request.body.userId
        let result = await User.findOne({_id:userId}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//查找所有用户
router.get('/findAllUsers',async(ctx)=>{
    try {
        const User = mongoose.model('User')
        let result = await User.find({}).sort({createdDate:-1}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//根据id查找用户
router.post('/searchUserById',async(ctx)=>{
    try {
        const User = mongoose.model('User')
        let id = ctx.request.body.searchInfo
        let result = await User.find({_id:id}).sort({createdDate:-1}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//根据用户名查找用户
router.post('/searchUserByName',async(ctx)=>{
    try {
        const User = mongoose.model('User')
        let name = ctx.request.body.searchInfo
        let result = await User.find({userName:{$regex:name}}).sort({createdDate:-1}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//根据id查找用户头像
router.post('/searchUserImgByID',async(ctx)=>{
    try {
        const User = mongoose.model('User')
        let id = ctx.request.body.id
        let result = await User.findOne({_id:id}).exec()
        ctx.body = {code:200,message:result.userImg}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//根据id查找用户名
router.post('/searchUserNameByID',async(ctx)=>{
    try {
        const User = mongoose.model('User')
        let id = ctx.request.body.id
        let result = await User.findOne({_id:id}).exec()
        console.log(result.userName)
        ctx.body = {code:200,message:result.userName}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

module.exports = router