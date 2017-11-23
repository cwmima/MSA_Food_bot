var request = require('request'); //node module for http post requests

exports.retreiveMessage = function (session){

    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/e3a681fc-f840-4ec4-a23b-60b6cc0f6481/url?iterationId=e5e72714-1233-41db-8256-f6a4200b779c',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': '08af1588c4a6476ebc2d79588bbcdb24'
        },
        body: { 'Url': session.message.text }
    }, function(error, response, body){
        console.log(validResponse(body));
        session.send(validResponse(body));
    });
}

function validResponse(body){
    if (body && body.Predictions && body.Predictions[0].Tag){
        return "This is " + body.Predictions[0].Tag
    } else{
        console.log('Oops, please try again!');
    }
}