var builder = require('botbuilder');
var food = require('./FavouriteFoods');
// Some sections have been omitted

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/df2ee137-d454-4ae9-adcd-715cc89d38f8?subscription-key=84155cbdb30540dbbbf4a25ef0932802&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('GetCalories', function (session, args) {
        //if (!isAttachment(session)) {

            // Pulls out the food entity from the session if it exists
            var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'food');

            // Checks if the for entity was found
            if (foodEntity) {
                session.send('Calculating calories in %s...', foodEntity.entity);
               // Here you would call a function to get the foods nutrition information

            } else {
                session.send("No food identified! Please try again");
            }
        //}
    }).triggerAction({
        matches: 'GetCalories'
    });

    bot.dialog('DeleteFavourite', function(session, args){
        session.send("DeleteFavourite intent found");
    }).triggerAction({
        matches: 'DeleteFavourite'
    });

    bot.dialog('WantFood', function(session, args){
        session.send("WantFood intent found");
    }).triggerAction({
        matches: 'WantFood'
    });


    bot.dialog('GetFavouriteFood', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            //if (!isAttachment(session)) {

                if (results.response) {
                    session.conversationData["username"] = results.response;
                }

                session.send("Retrieving your favourite foods");
                food.displayFavouriteFood(session, session.conversationData["username"]);   // <---- THIS LINE HERE IS WHAT WE NEED 
            //}
        }
    ]).triggerAction({
        matches: 'GetFavouriteFood'
    });

    bot.dialog('Welcome', function(session, args){
		session.send("Welcome intent found");
	}).triggerAction({
		matches: "Welcome"
	});


}
