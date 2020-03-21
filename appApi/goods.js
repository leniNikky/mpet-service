const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')

let router = new Router()

router.get('/insertAllGoodsInfo',async(ctx)=>{
    fs.readFile('./data_json/newGoods.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0
        const Goods = mongoose.model('Goods')
        data.map((value,index)=>{
            let newGoods = new Goods(value)
            newGoods.save().then(()=>{
                saveCount++
                console.log('保存成功')
            }).catch((error)=>{
                console.log('保存失败'+error)
            })
        })
    })
    ctx.body = '开始导入数据'
})

router.get('/insertEmployees',async(ctx)=>{
    fs.readFile('./data_json/employees.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0
        const Employee = mongoose.model('Employee')
        data.map((value,index)=>{
            let Employees = new Employee(value)
            Employees.save().then(()=>{
                saveCount++
                console.log('保存成功')
            }).catch((error)=>{
                console.log('保存失败'+error)
            })
        })
    })
    ctx.body = '开始导入数据'
})

router.get('/insertAllCategoryInfo',async(ctx)=>{
    fs.readFile('./data_json/category.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0
        const Category = mongoose.model('Category')
        data.RECORDS.map((value,index)=>{
            let newCategory = new Category(value)
                newCategory.save().then(()=>{
                    saveCount++
                    console.log('插入成功:'+saveCount)
                }).catch(error=>{
                    console.log('插入失败:'+error)
                })
        })
    })
    ctx.body = '开始插入数据...'
})

router.get('/insertAllCategorySubInfo',async(ctx)=>{
    fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0
        const CategorySub = mongoose.model('Category_sub')
        data.RECORDS.map((value,index)=>{
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(()=>{
                saveCount++
                console.log('插入成功：'+saveCount)
            }).catch(error=>{
                console.log('插入失败：'+error)
            })
        })
    })
    ctx.body='开始插入数据...'
})

//-------添加商品-------
router.post('/addGoods',async(ctx)=>{
    const Goods = mongoose.model('Goods')
    let goods = new Goods(ctx.request.body)
    await goods.save().then(()=>{
        ctx.body = {code:200,message:'添加成功'}
    }).catch(error=>{
        ctx.body = {code:500,message:error}
        console.log(error)
    })
})

//-------添加服务-------
router.post('/addService',async(ctx)=>{
    const Goods = mongoose.model('Goods')
    let goods = new Goods(ctx.request.body)
    await goods.save().then(()=>{
        ctx.body = {code:200,message:'添加成功'}
    }).catch(error=>{
        ctx.body = {code:500,message:error}
        console.log(error)
    })
})

//-------获取商品详情信息--------
router.post('/getGoodsDetailInfo',async(ctx)=>{
    try {
        let goodsID = ctx.request.body.goodsID
        const Goods = mongoose.model('Goods')
        let result = await Goods.findOne({_id:goodsID}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//-------获取所有大类--------
router.get('/getCategoryList',async(ctx)=>{
    try {
        const Category = mongoose.model('Category')
        let result = await Category.find({}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//-------获取商品大类--------
router.get('/getGoodsCategoryList',async(ctx)=>{
    try {
        const Category = mongoose.model('Category')
        let result = await Category.find({TYPE:1}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//-------获取服务大类--------
router.get('/getServiceCategoryList',async(ctx)=>{
    try {
        const Category = mongoose.model('Category')
        let result = await Category.find({TYPE:2}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//-------获取某个大类-------
router.post('/getOneCategory',async(ctx)=>{
    try {
        const Category = mongoose.model('Category')
        id = ctx.request.body.id
        let result = await Category.findOne({_id:id}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//-------添加一个大类-------
router.post('/addCategory',async(ctx)=>{
    const Category = mongoose.model('Category')
    let category = new Category(ctx.request.body)
    console.log(category)
    await category.save().then(()=>{
        ctx.body = {code:200,message:'添加成功'}
    }).catch(error=>{
        ctx.body = {code:500,message:error}
    })
})

//-------删除某个大类-------
router.post('/deleteCategory',async(ctx)=>{
    try {
        const Category = mongoose.model('Category')
        let id = ctx.request.body.id
        await Category.deleteOne({_id:id}).exec()
        ctx.body = {code:200,message:'删除成功'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//-------删除此大类下的所有小类-------
router.post('/deleteAllCategorySub',async(ctx)=>{
    try {
        const CategorySub = mongoose.model('Category_sub')
        let id = ctx.request.body.id
        await CategorySub.deleteMany({MALL_CATEGORY_ID:id}).exec()
        ctx.body = {code:200,message:'删除成功'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//-------删除此大类下的所有商品------
router.post('/deleteGoodsOFCategory',async(ctx)=>{
    try {
        const Goods = mongoose.model('Goods')
        let id = ctx.request.body.id
        await Goods.deleteMany({CAT_ID:id}).exec()
        ctx.body = {code:200,message:'删除成功'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//-------修改商品信息-------
router.post('/updateGoods',async(ctx)=>{
    try {
        const Goods = mongoose.model('Goods')
        let goods = ctx.request.body
        await Goods.updateOne({_id:goods._id},{NAME:goods.NAME,ORI_PRICE:goods.ORI_PRICE,
            PRESENT_PRICE:goods.PRESENT_PRICE,AMOUNT:goods.AMOUNT,DETAIL:goods.DETAIL,
            IMAGE1:goods.IMAGE1,IMAGE2:goods.IMAGE2,IMAGE3:goods.IMAGE3,IMAGE4:goods.IMAGE4,IMAGE5:goods.IMAGE5,
            CAT_ID:goods.CAT_ID,SUB_ID:goods.SUB_ID,GOOD_TYPE:goods.GOOD_TYPE,IS_RECOMMEND:goods.IS_RECOMMEND,
            CATEGORY_NAME:goods.CATEGORY_NAME,UPDATE_TIME:Date.now()}).exec()
        ctx.body = {code:200,message:'修改成功'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//-------修改商品库存-------
router.post('/changeGoodsAmount',async(ctx)=>{
    try {
        const Goods = mongoose.model('Goods')
        let id = ctx.request.body.id
        let amount = ctx.request.body.amount
        await Goods.updateOne({_id:id},{AMOUNT:amount}).exec()
        ctx.body = {code:200,message:'更新成功'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//-------修改商品已售数量-------
router.post('/changeGoodsSALESCOUNT',async(ctx)=>{
    try {
        const Goods = mongoose.model('Goods')
        let id = ctx.request.body.id
        let count = ctx.request.body.count
        await Goods.updateOne({_id:id},{SALES_COUNT:count}).exec()
        ctx.body = {code:200,message:'更新成功'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//-------修改服务信息-------
router.post('/updateService',async(ctx)=>{
    try {
        const Goods = mongoose.model('Goods')
        let service = ctx.request.body
        console.log(service.NAME)
        await Goods.updateOne({_id:service._id},{NAME:service.NAME,
            PRESENT_PRICE:service.PRESENT_PRICE,DETAIL:service.DETAIL,
            IMAGE1:service.IMAGE1,IMAGE2:service.IMAGE2,IMAGE3:service.IMAGE3,IMAGE4:service.IMAGE4,IMAGE5:service.IMAGE5,
            CAT_ID:service.CAT_ID,SUB_ID:service.SUB_ID,GOOD_TYPE:service.GOOD_TYPE,IS_RECOMMEND:service.IS_RECOMMEND,
            CATEGORY_NAME:service.CATEGORY_NAME,UPDATE_TIME:Date.now()}).exec()
        ctx.body = {code:200,message:'修改成功'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//-------修改某个大类的信息--------
router.post('/updateOneCategory',async(ctx)=>{
    try {
        const Category = mongoose.model('Category')
        let _id = ctx.request.body.categoryId
        let name = ctx.request.body.name
        let type = ctx.request.body.type
        let IMG = ctx.request.body.IMG
        await Category.update({_id:_id},{MALL_CATEGORY_NAME:name,TYPE:type,IMG:IMG}).exec()
        ctx.body = {code:200,message:'修改成功'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//-------获取小类别--------
router.post('/getCategorySubList',async(ctx)=>{
    try {
        const Category_sub = mongoose.model('Category_sub')
        let categoryId = ctx.request.body.categoryId
        let result = await Category_sub.find({MALL_CATEGORY_ID:categoryId}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//-------删除某个小类-------
router.post('/deteleCategorySub',async(ctx)=>{
    try {
        const Category_sub = mongoose.model('Category_sub')
        let id = ctx.request.body.id
        await Category_sub.deleteOne({_id:id}).exec()
        ctx.body = {code:200,message:'删除成功'}
    } catch (error) {
        ctx.body = {code:500,message:'删除失败'}
    }
})

//-------添加一个小类-------
router.post('/addOneCategorySub',async(ctx)=>{
    const Category_sub = mongoose.model('Category_sub')
    let categorySub = new Category_sub(ctx.request.body)
    await categorySub.save().then(()=>{
        ctx.body={
            code:200,
            message:'添加成功'
        }
    }).catch(error=>{
        ctx.body = {
            code:500,
            message:error
        }
    })
})

//-------根据商品类别获取商品列表
router.post('/getGoodsListByCategorySubID',async(ctx)=>{
    try {
        const Goods = mongoose.model('Goods')
        let categorySubId = ctx.request.body.categorySubId
        let page = ctx.request.body.page //当前页数
        console.log(page)
        let num = 10 //每页显示数量
        let start = (page-1)*num //开始位置
        let result = await Goods.find({SUB_ID:categorySubId,STATE:1}).skip(start).limit(num).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//------搜索商品
router.post('/searchGoodsBySearchWord',async(ctx)=>{
    try {
        const Goods = mongoose.model('Goods')
        let searchWord = ctx.request.body.searchWord
        let page = ctx.request.body.page //当前页数
        let num = 10 //每页显示数量
        let start = (page-1)*num //开始位置
        let result = await Goods.find({NAME:{$regex:searchWord}}).skip(start).limit(num).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//-------查找所有商品
router.get('/getAllGoods',async(ctx)=>{
    try {
        const Goods = mongoose.model('Goods')
        let result = await Goods.find({GOOD_TYPE:1}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//-------查找所有服务
router.get('/getAllService',async(ctx)=>{
    try {
        const Goods = mongoose.model('Goods')
        let result = await Goods.find({GOOD_TYPE:2}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//-------根据名字模糊查找商品-------
router.post('/findGoodsByName',async(ctx)=>{
    try {
        const Goods = mongoose.model('Goods')
        let info = ctx.request.body.name
        let result = await Goods.find({NAME: {$regex: info},GOOD_TYPE:1}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//-------根据id查找商品------
router.post('/findGoodsByID',async(ctx)=>{
    try {
        const Goods = mongoose.model('Goods')
        let info = ctx.request.body.id
        let result = await Goods.find({_id: info,GOOD_TYPE:1}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})  

//-------根据名字模糊查找服务-------
router.post('/findServiceByName',async(ctx)=>{
    try {
        const Goods = mongoose.model('Goods')
        let info = ctx.request.body.name
        let result = await Goods.find({NAME: {$regex: info},GOOD_TYPE:2}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//-------根据id查找服务------
router.post('/findServiceByID',async(ctx)=>{
    try {
        const Goods = mongoose.model('Goods')
        let info = ctx.request.body.id
        let result = await Goods.find({_id: info,GOOD_TYPE:2}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})  

//-------删除一件商品------
router.post('/deleteOneGoods',async(ctx)=>{
    try {
        const Goods = mongoose.model('Goods')
        let id = ctx.request.body.id
        await Goods.deleteOne({_id:id}).exec()
        ctx.body = {code:200,message:'删除成功'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//--------上下架商品-------
router.post('/changeGoodsState',async(ctx)=>{
    try {
        const Goods = mongoose.model('Goods')
        let id = ctx.request.body.id
        let state = ctx.request.body.state
        await Goods.updateOne({_id:id},{STATE:state}).exec()
        ctx.body = {code:200,message:'上架成功'}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//推荐商品列表
router.get('/recommentGoods',async(ctx)=>{
    try {
        const Goods = mongoose.model('Goods')
        let result = await Goods.find({IS_RECOMMEND:1,GOOD_TYPE:1}).sort({UPDATE_TIME:-1}).limit(3).exec()
        console.log(result)
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//热卖商品列表
router.get('/hotGoods',async(ctx)=>{
    try {
        const Goods = mongoose.model('Goods')
        let result = await Goods.find({GOOD_TYPE:1}).sort({SALES_COUNT:-1}).limit(6).exec()
        console.log(result)
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//首页各个大类的商品展示
router.get('/findGoodsOfCategory',async(ctx)=>{
    try {
        const Goods = mongoose.model('Goods')
        let id = ctx.request.body.id
        let result = await Goods.find({CAT_ID:id,GOOD_TYPE:1}).sort({UPDATE_TIME:-1}).limit(5).exec()
        console.log(result)
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//查找某个大类
router.post('/findOneCategory',async(ctx)=>{
    try {
        const Category = mongoose.model('Category')
        let id = ctx.request.body.id
        let result = await Category.findOne({_id:id}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

//寻找某个大类下的商品
router.post('/findGoodsOfCat',async(ctx)=>{
    try {
        const Goods = mongoose.model('Goods')
        let id = ctx.request.body.id
        let result = await Goods.find({CAT_ID:id}).sort({UPDATE_TIME:-1}).exec()
        ctx.body = {code:200,message:result}
    } catch (error) {
        ctx.body = {code:500,message:error}
    }
})

module.exports = router
