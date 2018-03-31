var AWS = require('aws-sdk');
var print = require('./helpers').printPretty;
AWS.config.update({region:'us-east-1'});
AWS.config.update({
    accessKeyId: "AKIAJJ7S3M23DBSECLGQ",
    secretAccessKey: "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",
    "region": "us-east-1"
});
var dynamodb = new AWS.DynamoDB();

console.log('List Tables: ');

var params = {};
dynamodb.listTables(params).promise()
    .then(print)
    .catch(print);



    var params = {
        Item: {
         "userId": {
           S: "michealLee",
         },
         "date": {
             S: "2018-03-31T01:24:12Z"
         },
         "bodyPart": {
            S:" Leg"
         },
         "painRating": {
             S: "5"
         },
         "additonalComments": {
             S: "Sharp pain when farting."
         }
        }, 
        ReturnConsumedCapacity: "TOTAL", 
        TableName: "dailyDoctorLogs"
       };
       dynamodb.putItem(params, function(err, data) {
         if (err) console.log(err, err.stack);
         else     console.log(data);
       });
        
        

var params1 = {};
dynamodb.listTables(params1).promise()
    .then(print)
    .catch(print);