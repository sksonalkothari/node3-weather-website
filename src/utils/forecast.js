const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/5b9aff82f6122fd015a5bfb21c8e7575/'+latitude+','+longitude+'?units=si'

    request({url, json: true}, (error, {body}) => {
        if(error){
           callback('Unable to connect', undefined)
        } else if(body.error){
            callback(body.error, undefined)
        } else {
            callback(undefined, body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out. There is a '+body.currently.precipProbability+'% chance of rain. Today\'s highest temperature is '+body.daily.data[0].temperatureHigh+' and lowest temperature is '+body.daily.data[0].temperatureLow)
        }
    })
}

module.exports = forecast