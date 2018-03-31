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
    alexa.registerHandlers(newSessionHandler, startGameHandlers);
    alexa.execute();
};
var newSessionHandler = {
    LaunchRequest() {
        this.handler.state = "ASKMODE";
        this.emit(":ask", "Welcome to Custom Alexa skill, are you ready to begin?");
        
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
        this.emit(":tell", "All your answers are correct. Thanks for playing");
    },
});
