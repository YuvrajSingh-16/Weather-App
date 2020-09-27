const request = require("request")

const forecast = (location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3367eb460fd2ccdfae7da3f4a0739a78&query=' + location + '&units=m'

    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect with weather services.', undefined)
        } else if(body.error){
            callback('Unable to find the location.', undefined)
        } else {
            console.log(body)
            const {current} = body
            console.log(body.location.name + "," , body.location.region + "," , body.location.country)
            callback(undefined, {
                description: current.weather_descriptions,
                temperature: current.temperature,
                location: body.location,
                current: current
            })
        }
    })
}

module.exports = forecast