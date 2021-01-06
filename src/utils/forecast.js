const request = require('postman-request')

// object destructuring - ref playground 5 
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f2ac2aad9e59e45f2affd7369c48b52c&query=' + latitude + ',' + longitude 
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        }else if (body.error) {
            callback('Unable to find location from forecast service ', undefined)
        }else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out')
        }
    } )

}

module.exports = forecast