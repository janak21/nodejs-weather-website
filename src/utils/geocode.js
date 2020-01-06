const request =require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiamFuYWsxMiIsImEiOiJjazR1MHlveHcwOGk2M2xsN2c4ZXBobWt0In0.QJqdwBclKe4h7bMOfHaaLQ'
     request ({url, json :true},(error, { body})=>{
        if(error){
            callback('Unable to connect location services!',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search.',undefined)
        }else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode