# mongodb grid

## intro

### connect mongodb

``` js
const { MongoClient } = require('mongodb');
const client = new MongoClient(yourConnectionURI);
await client.connect();
```

### CRUD

CRUD Operations
The MongoDB Node.js driver provides a variety of methods to help you query your data. These methods are known as CRUD (create, read, update, and delete) operations.

#### Create

Use insertOne() to create a new document. insertOne() has only one required parameter: the document to insert. If the document does not include a field named _id, the MongoDB Node.js driver will add one automatically.

To create multiple documents, use insertMany(). The only argument you are required to pass to insertMany() is an array of documents to insert.

Both insertOne() and insertMany() allow you to pass optional settings. One optional setting to note for insertMany() is the boolean ordered. If an insert fails when ordered is to true, the remaining inserts will not be executed. If an insert fails when ordered is to false, the remaining inserts will be executed. See the official documentation for more information.

#### Read

To retrieve a single document from your database, use findOne(). findOne() requires that you pass a query object. The query can contain zero to many properties.

To retrieve multiple documents from your database, use find(). Like findOne(), find() requires you to pass a query object that contains zero to many properties. find() returns a cursor that you can use to iterate over the results.

Both findOne() and find() allow you to pass optional settings when you call them. One handy option is projection, which allows you to explicitly exclude or include the fields that are returned in the query.

#### Update

Use updateOne() when you want to update a single document. updateOne() has two required parameters: a filter object that indicates which document should be updated and an update object that indicates the update operations that should be applied to the document.

To update multiple documents, you can use updateMany(). updateMany() has the same required parameters as updateOne(): a filter object and an update object.

Both updateOne() and updateMany() allow you to pass optional settings to them when you call them. upsert is one of the options you can pass. When upsert is set to true, a new document will be created if no document matches the query. upsert can be really helpful as it allows you to combine multiple operations into one: checking to see if a document exists and then updating the document if it exists or creating a new document if it does not.

#### Delete

To delete a single document, use deleteOne(). A filter object that indicates the document to be deleted is the only required parameter.

Use deleteMany() when you want to delete multiple documents. Like deleteOne(), the only required parameter is the filter object.

Both deleteOne() and deleteMany() allow you to pass optional settings as well. See the official documentation for more information.

Now you know the basics of querying data stored in a MongoDB database from a Node.js script. For more detailed information on how to execute the CRUD operations in a Node.js script, see MongoDB and Node.js Tutorial - CRUD Operations.

## design

### functions

1. AddNewGroup
2. AddNewPermition
3. UpdatePermitionByGroup
4. BatchUpdatePermition
5. GetGroups
6. GetPermissions
7. CheckPermissionError => means **health check and alert**
8. UpdateGroupName

## progress

1. GET  `/` : render grid
   1. get groups
   2. for g in groups, get permissions, and catch error
2. POST `/apply_update` : get the modified content and update the database
   1. get all modified content, push (location(group, permission), status) into a array
   2. for each location(group, permission), update permission status by location(group, permission)
3. POST `/add_new_permission` : add a new permission for all group
   1. add new permission
4. POST `/add_new_group` : add a group with all permission off
   1. add new group

## error catch

1. permissions not match

## deploy

``` sh
docker build -t mongodb_grid:v1 . 
docker run --rm --net=host --name=mongodb_grid mongodb_grid:v1
```

## some idea

1. Use pug templete
