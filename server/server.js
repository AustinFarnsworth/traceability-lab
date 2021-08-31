const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')


const app = express()
app.use(express.json())
app.use('style', express.static('./client/styles.css'))

let rollbar = new Rollbar({
    accessToken: "",
    captureUncaught: true, 
    captureUnhandledRejections: true
})

const ctrl = require('./controllers/controller')

app.get('/', getPath) 


const port = process.env.PORT || 4000


app.listen(port, () => console.log(`Listening on port ${port}`))