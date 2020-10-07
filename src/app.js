const express = require("express")
const path = require("path")
const hbs = require("hbs")
const forecast = require("./utils/forecast")

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, "../templates/partials")

// creating app object from top level express() function
const app = express()
const port = process.env.PORT || 3000

// Setting handlebars engine and views location
app.set('view engine', 'hbs')  // view engine to handlebar
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setting public/static directory to serve
app.use(express.static(publicDirPath))

// Route and renders
app.get('', (req, res) => {
  res.render('index', {
    title: "Weather",
    name: "UVSinghK"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    name: "UVSinghK",
    title: "About Me"
  })
})

app.get("/products", (req, res) => {
  if(!req.query.search){
    return res.send({
      error: "Query not found !"
    })
  }

  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: "This is help page for my website!",
    title: "Help",
    name: "UVSinghK"
  })
})

app.get('/weather', (req, res) => {
    if(!req.query.address && !req.query.search){
      return res.send({
        error: "Please provide the address to be resolved !"
      })
    }
    var address = ""
    if (req.query.address){
      address = req.query.address
    }else{
      address = req.query.search
    }

    forecast(address, (error, data) => {
      if(error){
        return res.send({
          error: error
        })} else{
          if(req.query.address){
            return res.send({
              title: "Forecast Today",
              forecast: data.description,
              address: req.query.address,
              location: data.location.region,
              temperature: data.temperature,
              name: "UVSinghK",
              observation_time: data.current.observation_time,
              currentTime: data.location.localtime,
              visibility: data.current.visibility,
              humidity: data.current.humidity
            })
          }

          res.render('weather', {
            title: "Forecast Today",
            forecast: data.description,
            address: req.query.search,
            location: data.location.region,
            temperature: data.temperature,
            name: "UVSinghK",
            observation_time: data.current.observation_time,
            currentTime: data.location.localtime,
            visibility: data.current.visibility,
            humidity: data.current.humidity
        })
        }
    })
})

app.get("/help/*", (req, res) => {
    res.render('error', {
      title: "Help Page",
      errorMessage: "Help article not found",
      name: "UVSinghK"
    })
})

app.get("*", (req, res) => {
    res.render('error', {
      title: "404 error",
      errorMessage: "Page not found",
      name: "UVSinghK"
    })
})

// Listening for connection request on specific port
app.listen(port, () => {
  console.log("Server up running on port " + port)  
})