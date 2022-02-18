const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a1fa406f2da14fa109d7dffc63ba995b&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather services', undefined)
        } else if(body.error) {
            callback('Unable to find location try another search', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0]+' it is currently '+body.current.temperature+' degree out. & there is '+body.current.precip+'% chances of rain')
        }
    })
}
module.exports = forecast