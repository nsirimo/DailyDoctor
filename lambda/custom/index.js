'use strict';
const Alexa = require('alexa-sdk');
var AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: "AKIAJJ7S3M23DBSECLGQ",
    secretAccessKey: "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",
    "region": "us-east-1"
});
var dynamodb = new AWS.DynamoDB.DocumentClient();

const APP_ID = 'amzn1.ask.skill.acf2492c-e616-41ed-8c3e-1ab0f56fd6ca';

var date = " ";
var user = "KenYang";
var bodyPart = " ";
var painDescription = " ";
var painRating = " ";
var additionalComments = " ";


function putItem(params) {
    dynamodb.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

// Launch the Alexa skill
const newSessionHandler = {
    LaunchRequest() {
        date = new Date();
        this.handler.state = "ASKMODE";
        this.emit(":ask", "Welcome to Daily Doctor. Are you feeling any pain or discomfort?");
    }
};

const startGameHandlers = Alexa.CreateStateHandler("ASKMODE", {
    "AMAZON.YesIntent": function () {
        this.emitWithState("AskPain");
    },
    "AMAZON.NoIntent": function () {
        this.handler.state = "FINISHMODE";
        this.emitWithState("FinishIntent");
    },
    "AskPain": function () {
        this.handler.state = "CUSTOMANSWERMODE";
        this.emit(":ask", 'Please specify the area of discomfort or pain');
    },
    "AskRating": function () {
        this.handler.state = "CUSTOMANSWERMODE";
        this.emit(":ask", 'Please rate your discomfort on a scale from one to five, five being extreme pain and one being mild pain.')
    },
    "AdditionalDetails": function () {
        var addDet = "I fart when I sneeze";
        additionalComments = addDet;
        this.handler.state = "REDOMODE";
        this.emit(":ask", 'Thank you. Would you like to log any additional pain or discomfort?');
    }
});

const askQuestionHandlers = Alexa.CreateStateHandler("ANSWERMODE", {
    "AMAZON.YesIntent": function () {
        this.handler.state = "ASKMODE";
        this.emitWithState("FinishIntent");
    },
    "AMAZON.NoIntent": function () {
        this.handler.state = "FINISHMODE";
        this.emitWithState("FinishIntent");
    }
});

const customHandlers = Alexa.CreateStateHandler("CUSTOMANSWERMODE", {
    "logPain": function () {
        var bodyPartValue = this.event.request.intent.slots.body_part.value;
        bodyPart = bodyPartValue;
        if ('value' in this.event.request.intent.slots.pain_description) {
            var painDescriptionValue = this.event.request.intent.slots.pain_description.value;
            painDescription = painDescriptionValue;
        }
        this.handler.state = "ASKMODE";
        this.emitWithState("AskRating");
    },
    "ratePain": function () {
        var painRatingValue = this.event.request.intent.slots.pain_rating.value;
        painRating = painRatingValue;
        this.handler.state = "ASKMODE";
        this.emitWithState("AdditionalDetails");
    }
});

// Ask if there are any additional pain/discomforts
const redoHandler = Alexa.CreateStateHandler("REDOMODE", {
    "AMAZON.YesIntent": function () {
        date = new Date();
        this.handler.state = "ASKMODE";
        this.emitWithState("AskPain");
    },
    "AMAZON.NoIntent": function () {
        this.handler.state = "FINISHMODE";
        this.emitWithState("FinishIntent");
    }
});

// Finish state
const finishHandler = Alexa.CreateStateHandler("FINISHMODE", {
    "FinishIntent": function () {
        this.emit(":tell", "Thank you for logging your health. Have a good day!");
    }
});

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(newSessionHandler, startGameHandlers, askQuestionHandlers, customHandlers, redoHandler, finishHandler);
    alexa.execute();
    var params = {
        TableName: "dailyDoctorLogs",
        Item: {
            "dateId": date.toString(),
            "user": user.toString(),
            "bodyPart": bodyPart.toString(),
            "painDescription": painDescription.toString(),
            "painRating": painRating.toString(),
            "additionalComments": additionalComments.toString()
        }
    };
    putItem(params);
};