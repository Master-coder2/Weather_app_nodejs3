const request = require('request')
const forcast = (latitude,longitude,callback)=>{
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=c04b19f369824baf7b70a8f8f6d85930&units=metric'
    request({url:url,json:true},(error,{body}=[])=>{
        if(error){
            callback("Unable to connect to the server",undefined)
        }
        else if(body.message){
            callback("Invalid coordinate Pairs",undefined)
        }
        else{
            callback(undefined,'Temperature is ' + body.main.temp + ' and Weather is ' + body.weather[0].description);
        }
    })
}
module.exports = forcast