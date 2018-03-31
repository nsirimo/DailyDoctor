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
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('logIntent');
    },
    'logIntent': function () {
        var speechOutput = 'yo does your shit hurt?';
  
        this.emit(':tell', speechOutput);
    },
    'AMAZON.YesIntent': function () {
        const speechOutput = 'yes mother fucker';

        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.NoIntent': function () {
        const speechOutput = 'no you loser';

        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};