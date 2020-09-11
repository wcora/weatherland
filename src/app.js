const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs'); // for dynamic templates
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// request geocode data
const request = require('postman-request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


// setup express static folder
app.use(express.static(publicDirectoryPath)); // the content of our static html


// render dynamic templates -> app.get(path, callback);
app.get('/', (req, res) => { // (request, response) read data from database, create an html, etc.
    res.render('index', {
        title: 'Weather App',
        name: 'Cora Wang'
    })
});

// this is the json for consumption by code
app.get('/weather', (req, res) => { // (request, response) read data from database, create an html, etc.
    if (!req.query.address) {
        return res.send({
            error:'You must provide an address'
        })
    }
    console.log(req.query);

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(latitude, longitude, location, (error, condition, temperature, data) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                forecast: data,
                condition,
                temperature,
                location,
                address: req.query.address
            });
        })
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Your page cannot be found :(',
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('server is up on ' + port);
})
