const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define Paths for express config 
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


const app = express()


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve  
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Omkar Joglekar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Omkar Joglekar"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "This is a Help page ",
        title: 'Help',
        name: 'Omkar Joglekar'
        
    })
})



app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address not provided '
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }   
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })

})

app.get('/products', (req, res)=>{
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render("404", {
        title: '404',
        name: 'Omkar',
        errorMessage: 'Help Article not found'
    })
})


app.get('*', (req, res) => {
    res.render("404", {
        title: '404',
        name: 'Omkar',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log("server is up on port 3000.")
})
