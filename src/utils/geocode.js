const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2tzb25hbGtvdGhhcmkiLCJhIjoiY2s4Ymk4dHYzMDZjMTNtcDl6ampvdTl6MiJ9.sBYfaeB78Ggaj6AiMR-i6g&limit=1'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect', undefined)
        }else if(body.features === undefined || body.features.length === 0){
            callback('No response found', undefined)
        }else{
            const data = {
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode