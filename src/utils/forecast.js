const request = require('request');



const forecast = (lat, lon, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=6f8e9723c298f7028b9a43dea2e5371f&query='+ encodeURIComponent(lat) +','+ encodeURIComponent(lon) +'&units=f';
    request({url,
            json: true
            }
            ,(error, {body})=>{
                if(error){
                    callback("Unable to connect to weather service",error);
                }else if(body.error){
                    callback("Unable to find location",error);
                }else{
                        callback(undefined,{
                            description: body.current.weather_descriptions[0],
                            tepreture: body.current.temperature, 
                            feelsLlike :body.current.feelslike
                        });
                }
            });
}



module.exports = forecast;