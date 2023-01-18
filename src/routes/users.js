const router = require('koa-router')()
const { MongoClient } = require('mongodb')
const { mongodb_url } = require('../config/constant')

const client = new MongoClient(mongodb_url)

router.prefix('/user')

router.post('/apply_update', async function (ctx, next) {
  // console.log(ctx.request.body)
  db = client.db("lark_bot")
  for(let i in ctx.request.body){
    let repo = i.split('=')[0]
    let func = i.split('=')[1]
    let collection = await db.collection(repo)
    let param = {}
    let _status = "on"
    if(ctx.request.body[i] ==="on"){
      _status = "off"
    }
    eval('param.' + func + '="' + _status + '"')
    await collection.updateOne({ "repo": repo }, {$set:param})
  }
  await ctx.redirect('/')
})

router.post('/add_new_group', async function (ctx, next) {
  console.log('add_new_group')
  console.log(ctx.request.body)
  // TODO get permission list
  let group_info = {
    "repo_fullname": ctx.request.body.repo_fullname,
    "lark_group": ctx.request.body.group_name,
    "repo": ctx.request.body.repo_name
  }
  db = client.db("lark_bot")
  let _collections = await db.collections()
  let co = _collections[0].s.namespace.collection
  let collection = db.collection(co)
  let results = await collection.find({}).toArray()
  let _permissions = []
  for(let k in results){
    if(results[k] === 'on' || results[k] === 'off'){
      _permissions.push(k)
    }
  }
  for(let h in _permissions){
    eval('group_info.' + _permissions[h] + '="off"')
  }
  console.log(group_info)
  await db.createCollection(ctx.request.body.repo_name)
  collection = db.collection(ctx.request.body.repo_name)
  await collection.insertOne(group_info)
  await ctx.redirect('/')
})

router.post('/add_new_permission', async function (ctx, next) {
  console.log('add_new_permission')
  console.log(ctx.request.body)
  let new_permission = String(ctx.request.body.new_permission)
  console.log(new_permission)
  db = client.db("lark_bot")
  let _collections = await db.collections()
  for(let j in _collections){
    let co = _collections[j].s.namespace.collection
    let collection = db.collection(co)
    let p = await collection.find({}).toArray()
    p = p[0]
    let _id = p._id
    delete p._id
    eval('p.' + new_permission + ' = "off"')
    await collection.deleteOne({_id: _id})
    await collection.insertOne(p)
  }
  await ctx.redirect('/')
})

router.post('/delete_a_group', async function (ctx, next) {
  console.log('delete_a_group')
  console.log(ctx.request.body)
  db = client.db("lark_bot")
  await db.dropCollection(ctx.request.body.repo_name)
  await ctx.redirect('/')
})

router.post('/delete_a_permission', async function (ctx, next) {
  console.log('delete_a_permission')
  console.log(ctx.request.body)
  let delete_permission = String(ctx.request.body.permission)
  console.log(delete_permission)
  db = client.db("lark_bot")
  let _collections = await db.collections()
  for(let j in _collections){
    let co = _collections[j].s.namespace.collection
    let collection = db.collection(co)
    let p = await collection.find({}).toArray()
    p = p[0]
    let _id = p._id
    delete p._id
    eval('delete p.' + delete_permission)
    await collection.deleteOne({_id: _id})
    await collection.insertOne(p)
  }
  await ctx.redirect('/')
})

module.exports = router
