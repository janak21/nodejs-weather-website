const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 8080

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Janak Sawale'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Janak Sawale'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title:'Help',
        name:'Janak Sawale'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
         return res.send({
            error:'You must provide an address'
        })

    }else{

        geocode(req.query.address,(error, { latitude,longitude,location} = {})=>{
            if(error){
                return res.send({error})
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
               if(error){
                   return res.send(error)
               }
        
               res.send({
                   forecast:forecastData,
                   location,
                   address:req.query.address
               })
        
              })
        })
    }
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404',
        name:'Janak Sawale',
        errorMessage:'Help article not found.'

    })
})

app.get('*', (req, res) =>{
    res.render('404',{
        title:'404',
        name:'Janak Sawale',
        errorMessage:'Page not found.'
    })
})
app.listen(port, () => {
    console.log('Server is up on port '+port )
})
