const router = require('koa-router')()
const { MongoClient } = require('mongodb')

const client = new MongoClient("mongodb://127.0.0.1:27017")

router.prefix('/users')

router.post('/update', async function (ctx, next) {
  // ctx.body = 'this is a users response!'
  db = client.db("lark_bot")
  // for(let i in ctx.request.body){
  //   // console.log(i)
  //   // console.log(ctx.request.body[i])
  //   // let repo = i.split('=')[0]
  //   // let func = i.split('=')[1]
  //   // console.log(repo)
  //   // console.log(func)
  //   // let collection = await db.collection(repo)
  //   // let param = {}
  //   // eval('param.' + func + '="' + ctx.request.body[i] + '"')
  //   // console.log(param)
  //   // // await collection.updateOne({ "repo": repo }, {$set:param})
  //   console.log(i)
  //   break
  // }
  console.log(ctx.request.body)

  await ctx.redirect('/')
})

module.exports = router
