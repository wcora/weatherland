const request = require('postman-request');

/* work with weatherstack API, get the latitude longitude and print out weather */
const forecast = (latitude, longitude, location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9a4a7591fd04a40456e30d1826881449&query=' + latitude + ',' + longitude;

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined, undefined, undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined, undefined, undefined);
        } else {
            callback(undefined,
                body.current.weather_descriptions,
                body.current.temperature,
                'It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
};

module.exports = forecast;
