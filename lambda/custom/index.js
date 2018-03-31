'use strict';
const Alexa = require('alexa-sdk');

const APP_ID = undefined;

const SKILL_NAME = 'Daily Doctor';
const INITIAL_MESSAGE = "Is there any pain or discomfort?";
const HELP_MESSAGE = 'You can say tell me a penis fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(newSessionHandler, startGameHandlers, askQuestionHandlers);
    alexa.execute();
};
var newSessionHandler = {
    LaunchRequest() {
        this.handler.state = "ASKMODE";
        this.emit(":ask", "Welcome to Daily Doctor, are you ready to begin?");
        
    }
};

const startGameHandlers = Alexa.CreateStateHandler("ASKMODE", {
    "AMAZON.YesIntent": function () {
        this.emitWithState("AskQuestionIntent");
    },
    "AskQuestionIntent": function() {
        this.handler.state = "ANSWERMODE";
        this.emit(":ask", 'does your penis hurt badly?');
    },
    "FinishIntent": function() {
        this.emit(":tell", "Thank you for logging your health, have a good day!");
    },
});

const askQuestionHandlers = Alexa.CreateStateHandler("ANSWERMODE", {
    "AMAZON.YesIntent": function () {
        this.handler.state = "ASKMODE";
        
        this.emitWithState("FinishIntent");
    },
    "AMAZON.NoIntent": function () {
        this.handler.state = "ASKMODE";
        
        this.emitWithState("FinishIntent");
    }
});
