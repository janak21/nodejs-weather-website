const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/3fa0709cbda90e76a1d32447469fa2d9/'+latitude+','+longitude+'?units=si'
    request({url, json:true},(error, { body})=>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            callback('Unable to find Location',undefined)
        }else{
            console.log(body.daily.data[0])
            callback(undefined,body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degree out. This high today is '+body.daily.data[0].temperatureHigh +' with low of '+body.daily.data[0].temperatureLow +'. There is '+body.currently.precipProbability+'% chance of rain.'
            )
        }
    })
}

module.exports = forecast