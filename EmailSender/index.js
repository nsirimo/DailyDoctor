// load aws sdk
var aws = require('aws-sdk');

// load aws config
aws.config.loadFromPath('config.json');

// load AWS SES
var ses = new aws.SES({apiVersion: '2010-12-01'});

// send to list
var to = ['kmanfool1@gmail.com']

// this must relate to a verified SES account
var from = 'kmanfool2@gmail.com'


const Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

     //alexa.appId = 'amzn1.ask.skill.36b29ccb-f725-4c08-9fbd-7142b7b1551d';
    // alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes

    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('sendEmail');
    },

    'sendEmail': function () {
ses.sendEmail( { 
   Source: from, 
   Destination: { ToAddresses: to },
   Message: {
       Subject:{
          Data: 'A Message To You Rudy'
       },
       Body: {
           Text: {
               Data: 'Stop your messing around',
           }
        }
   }
}
, function(err, data) {
    if(err) throw err
        console.log('Email sent:');
        console.log(data);
 });

    }
};


// this sends the email
// @todo - add HTML version
