const chatbase = require('@google/chatbase')
    .setApiKey('[your api key]')  // Your api key
    .setUserId('some-unique-user-id') // The id of the user you are interacting with
    .setPlatform('gorge-of-peril') // The platform the bot is interacting on/over
    .setVersion('1.0') // The version of the bot deployed
    .setIntent('cross-gorge-of-peril'); // the intent of the user messa
