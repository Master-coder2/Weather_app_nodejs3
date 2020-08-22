const request = require('request')

const geocode = (address ,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibWFzdGVyY29kZXIiLCJhIjoiY2tlMzR2emF2MGZyZzJ0bWg1aDh3YXI5NCJ9.LcizG8ieMgdpjToLsTZmpg&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to Connect to Server',undefined)
        }
        else if(body.message){
            callback(body.message,undefined)
        }
        else if(body.features.length===0){
            callback('Place name is Invalid',undefined)
        }
        else {
            callback(undefined,{ "Latitude" :body.features[0].center[1]
                    , "Longtitude" : body.features[0].center[0]
                ,"Location": body.features[0].place_name})
        }
    })
}

module.exports = geocode