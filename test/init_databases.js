const { MongoClient } = require('mongodb')


const client = new MongoClient("mongodb://127.0.0.1:27017")  

!(async function(){
    await client.connect()
    console.log('Connected successfully to server')
    db = client.db("lark_bot")
    let glist = []
    glist.push("mim","mmclassification","mmcv","mmdetection","mmdetection3d","mmediting","mmengine","mmeval","mmflow","mmocr","mmsegmentation","mmselfsup","mmyolo","MyPic","test1","user")
    for(let i in glist){
        let collection = db.collection(glist[i])
        await collection.insertOne({"repo_fullname": 'open-mmlab/' + glist[i], "lark_group": 'tmp', "new_issue_notice": 'off', "new_pr_notice": 'off', "pr_merged_notice": 'off', "repo": glist[i], "review_submitted": 'off', "review_remind_pr_sender": 'off'})
        let findResult = await collection.find({}).toArray()
        console.log(findResult)
    }
    console.log(glist)
    await client.close()
})()
