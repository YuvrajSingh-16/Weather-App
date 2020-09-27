const request = require("request")
const forecast = require("./forecast")

forecast("Dewas", (error, data) => {
    const url = 'https://api.darksky.net/forecast/76733e9c3ca293ed6de639d3d5bf874f/' + data.longitude + ',' + data.latitude
    
    request({url: url, json: true}, (error, response) => {
        console.log(response)
    })
})