const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()

app.use(express.static(path.join(__dirname, "../public")))
app.set('view engine', 'hbs')
viewsPath = path.join(__dirname, "../templates/views")
app.set('views', viewsPath)

partialsPath = path.join(__dirname, "../templates/partials")
hbs.registerPartials(partialsPath)

app.get("", (req, res) => {
    res.render('index', {
        name: "UVSinghK",
        title: "Weather app",
        age: 19
    })
})

app.get("/help", (req, res) => {
    res.render('help', {
        name: "UVSinghK",
        message: "This is help page",
        title: "Help"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        name: "UVSinghK",
        message: "This is about me page !",
        title: "About Me"
    })
})

app.get("/help/*", (req, res) => {
    res.render('error', {
        name: "UVSinghK",
        errorMessage: "This help page does not exist !"
    })
})

app.get("*", (req, res) => {
    res.render('error', {
        name: "UVSinghK",
        errorMessage: "Page not found",
        title: "404 error"
    })
})

app.listen(3000, () => {
    console.log("Test started")
})