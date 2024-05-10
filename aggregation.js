//what is Aggregation :It groups the data from multiple documents into a single document based on the specified expression


//syntax
//====same result ========
//db.collection.aggregate([]) 
//db/collection.find({});

//==========aggregation stage Operators===
//  {$<stageOperator>:{} }
//examples
{$match:{age:{$gt:20}}}
{$group:{_id:"$age"}}
{$sort:{count:-1}}
//$project $count $limit $skip $out


//========expressions============
//Expression refers to the name of the field in input documents

"$<fieldName>"
//examples
{$group:{_id:"$age"}}
{$group:{_id:"$company.location.country"}}
//{$group:{_id:"$name",total:{$sum:"$price"}}}


//=====$match Stage===========
//match specific documents using query
{$match:{query}}
//example
{$match:{city:"New York"}}
{$match:{age:{$gt:25}}}
{$match:{$and:[{gender:"female"},{age:{$gt:25}}]}}

//======example=======
db.model.aggregate([
    {$match:{age:{$gt:25}}}
])

//======= $group stage ==========
//group input documents by certain expressions

//syntax:
// {$group:{_id:expression,field1:accumulator1:expression1}};


//=======example===
{$group:{_id:"$age"}}
// =====second example=
//{$group:{_id:{age:"$age",gender:"$gender"}}}

//===third example=======
db.model.aggregate([
    {$group:{_id:"$age"}}
])

//========
db.model.aggregate([
    {$group:{_id:"$company.location.country"}}
])

//========
db.model.aggregate([
    {$group:{_id:{age:"$age",gender:"$gender"}}}
])

//example : $match and $group

db.model.aggregate([
    {$match:{fruit:"banana"}},
    {$group:{_id:{age:"$age",eyeColor:"$eyeColor"}}}
])

//=======change order ======
// db.model.aggregate([
//     {$group:{_id:{age:"$age",eyeColor:"$eyeColor"}}},
//     {$match:{fruit:"banana"}}
// ])


//============= $count stage===========
//counts number of the  input documents

//syntax:    {$count:"<title>"}

//========== example=====
db.model.aggregate([{$count:"countries"}])

db.model.aggregate([
    {$count:"allDocumentsCount"}//0,21 sec
])

//===== diffrenet count method====
db.model.aggregate([]).toArray().length// time  1,7 sec

db.model.aggregate([]).itcount()//  time  1,4sec


//===$group and $count
db.model.aggregate([
  {$group:{_id:"$company.location.country"}},
  {$count:"countriesCount"}
])

db.model.aggregate([
    {$group:{_id:{eyeColor:"$eyeColor",age:"$age"}}},
    {$count:"eyeColorAndAge"}
])

//=========$match $group $count ===========
db.model.aggregate([
    {$match:{age:{$gte:25}}},
    {$group:{_id:{eyeColor:"$eyeColor",age:"$age"}}},
    {$count:"eyeColorAndAge"}
])

//=========== $sort stage=====
//sorts input documents by certain field
//syntax:  {$sort:{<field1>:<-1|1>, <filed2>:<-1|1>}}

//======example=======
{$sort:{score:-1}}
//{$sort:{age:1,country:1}}

db.model.aggregate([
    {$sort:{name:1,gender:-1}}
])

//========$group and $sort
db.model.aggregate([
    {$group:{_id:"$favoriteFruit"}},
    {$sort:{_id:1}}
])
//===========
db.model.aggregate([
    {$group:{_id:"$age"}},
    {$sort:{_id:1}}
])

//=====
db.model.aggregate([
    {$group:{_id:"$eyeColor"}},
    {$sort:{_id:1}}
])

//========
db.model.aggregate([
    {$match:{eyeColor:{$ne:"blue"}}},
    {$group:{_id:{eyeColor:"$eyeColor",favoriteFruit:"$favoriteFruit"}}},
    {$sort:{"_id.eyeColor":1,"_id.favoriteFruit":-1}}
])

//==========$project stage
//includes,excludes or adds new field
//syntax: {$project:{<field1>:<1>,<field2>:<0>,<newField1>:<expression>..}}


//===example=====

//{$project:{name:1,"company.title":1}}

//{$project:{_id:0,name:1,age:1}} //_id is excludes

//{$project:{eyeColor:0,age:0}}

//=====add new field========
//{$project:{name:1,newAge:"$age"}}

//==example

db.model.aggregate([
    {$project:{name:1,"company.location.country":1}}
])

db.model.aggregate([
    {$project:{isActive:1,name:1,gender:1}},
    
])

//======= $project with new fields===
db.model.aggregate([
    {$project:{
        _id:0,
        index:1,
        name:1,
        info:{
            eyes:"$eyeColor",
            company:"$company.title",
            country:"$company.location.country"
        }
    }}
])


//===========$limit stage ===========

//outputs first N documents from the limit
//syntax:  {$limit:<number>}

//======example=======
{$limit:100}

//==== $limit , $match and $group
db.model.aggregate([
    {$limit:100},
    {$match:{age:{$gt:27}}},
    {$group:{_id:"$company.location.country"}}
])


//========== $unwind stage=======
//splits each documents with specified array to several documents one documents per array element

//syntax:  {$unwind:<arrayReferenceExpression>}

//  structure of $unwind

//input:    Document1{...tags:["first","second","third"]...}

//output:   Document1{...tags:"first"}  Document2{...tags:"second"} Document3{...tags:"third"}
 

//====== $unwind and $project===========

db.model.aggregate([
    {$unwind:"$tags"},
    {$project:{name:1 ,gender:1,tags:1}}
])

//============$unwind and $group=====
db.model.aggregate([
    {$unwind:"$tags"},
    {$group:{_id:"$tags"}}
])

//======= Accumulators Operator========
// most accumulators are used only in the  $group stage 

// == $sum  $avg  $max  $min ===========

//Accumulators maintain state for each group of the documents.
//syntax: {$<accumulatorOperator>:<expression>}

//====Examples====
{$sum:"$quantity"}
{$avg:"$age"}
{$max:"$spentMoney"}


//======= $sum Accumulator ========
//Sums numeric values for the documents in each group

//{$sum:<expression|number>}

//=====example====

{total:{$sum:"$quantity"}}
{count:{$sum:1}} //simple way to count number of the documents in each group


//==== $sum and $group====

db.model.aggregate([
    {
        $group:{_id:"$age",count:{$sum:1}}
    }
])


//=========== $sum $unwind and $group============

db.model.aggregate([
    {$unwind:"$tags"},
    {
        $group:{
            _id:"$tags",
            count:{$sum:1}//only int  count:{$sum:NumberInt(1)}
        }
    }
])

//============$avg accumulator ===========
//calculates average value of the certain values in the documents for each group.

//syntax: {$avg:<expression>}

//======== example ====
{avgAge:{$avg:"$age"}}


//====== $avg and $group========

db.model.aggregate([
    {
        $group:{
            _id:"$eyeColor",
            avgAge:{$avg:"$age"}
        }
    }
])


//=========== Unary Operator =========
//Unary Operators are usually used in the $project stage
//In the $group stage Unary operators can  be used only in conjuction with Accumulators 

// == $type  $or  $lt  $gt  $and $multiply


//===   $type Unary Operator =======
// Returns BSON type of the filed's value
//{$type:<expression>}

//==Example =====
{$type:"$age"}
{$type:"$name"}

db.model.aggregate([
    {
        $project:{
            name:1,
            eyeColorType:{$type:"$eyeColor"},
            ageType:{$type:"$age"}
        }
    }
])


//======= $out Stage ==========
//writes resulting documents to the mongoDB collection
//syntax:  {$out:"<outputCollectionName>"}

//note: $out must be last stage in the pipeline
//if output collection doesn't exist, it will be created automatically

//====Example ========
//{$out:"newCollection"}

db.model.aggregate([
    {$group:{_id:{age:"$age",eyeColor:"$eyeColor"}}},
    {$out:"aggregationResults"}
])

//========== $lookup ===========
// The $lookup is an aggregation pipeline stage that allows you to perform a left outer join b/w two collection

db.model.aggregate([
    {$lookup:{
        from:"another collection",
        localField:"current collection _id",
        foreignField:"another collection foreign_id",
        as:"new column"
    }},
   
])


//==========Hitesh Choudhary lecture=========












