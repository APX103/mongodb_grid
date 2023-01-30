const router = require('koa-router')()
const { MongoClient } = require('mongodb')
const { mongodb_url } = require('../config/constant')

const client = new MongoClient(mongodb_url)

router.get('/', async (ctx, next) => {
  await client.connect()
  // console.log('Connected successfully to server')
  db = client.db("lark_bot")
  let _collections = await db.collections()
  let collections = []
  let permissions = []
  let group_info = ['repo_fullname', 'lark_group']
  let permission_metrics = new Map()
  let group_info_map = new Map()
  for(let j in _collections){
    let co = _collections[j].s.namespace.collection
    permission_metrics.set(eval("co"), new Map())
    group_info_map.set(eval("co"), new Map())
    collections.push(co)
    let collection = db.collection(co)
    let results = await collection.find({}).toArray()
    // console.log(co)
    let _permissions = []
    let p_flag = false
    for(let k in results[0]){
      if(results[0][k] === 'on' || results[0][k] === 'off'){
        _permissions.push(k)
        let _status = true
        if (results[0][k] === 'off'){
          _status = false
        }
        permission_metrics.get(co).set(k, _status)
      }
      if(k === "repo_fullname" || k === "lark_group"){
        group_info_map.get(co).set(k, results[0][k])
      }
    }
    // console.log(_permissions)
    if ((permissions.sort().toString() !== _permissions.sort().toString()) && p_flag === true){
      console.log("===========wrong===========")
    } else if(p_flag === false){
      permissions = _permissions
      p_flag = true
    }
  }

  // console.log(collections)
  // console.log(permission_metrics)
  // console.log(group_info_map)
  await ctx.render('index', {
    title: "lark_bot permission",
    repos: collections,
    permissions: permissions,
    permission_metrics: permission_metrics,
    group_info: group_info,
    group_info_map: group_info_map
  })
  await client.close()
})

module.exports = router
