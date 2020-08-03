const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoid2ludGVzZmEiLCJhIjoiY2tkNnFvMHlxMmpiMTJ1cXlsb3M1M3lsdyJ9.dJn03MiySXum0acACpME6Q&limit=1";
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('unable to connect to location services!!!', undefined)
        }
        else if (body.features.length === 0) {
            callback('unable to find location', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;