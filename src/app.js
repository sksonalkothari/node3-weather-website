//core node module before npm module
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//define path for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'Sonal'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About me',
        name:'Sonal'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help',
        name:'Sonal',
        message:'Please email me for any doubt'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'address must be provided'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Sonal',
        errorMessage:'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Sonal',
        errorMessage:'Page not found'
    })
})

//start the server
app.listen(port, () => {
    console.log('Server is up on port '+port)
})