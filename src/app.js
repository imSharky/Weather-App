const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)  //show directory/folder name src
// console.log(path.join(__dirname, '../public')) //show public
// console.log(path.join(__dirname))  //show same folder src
// console.log(path.join(__dirname, '..')) //show parent web-server
// console.log(path.join(__dirname, '../..')) //show NODE-COURSE


const app = express()
//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')  
const partialsPath = path.join(__dirname, '../templates/partials')
//setup handlebars engine and views location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Sharik Khan'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sharik Khan'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'help',
        name: 'Sharik Khan'
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')    //res.send('Hello express!')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'sharik'
//     }, {
//         name: 'saliq'
//     }])
// })
// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// })
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude,location } = {}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'it is snowing',
    //     location: 'delhi',
    //     address: req.query.address
    // })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Sharik Khan',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {   //* when nothing match
        res.render('404', {
            title: '404',
            name: 'Sharik Khan',
            errorMessage: 'Page not found'
        })
    })

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})