const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')


const app = express()
app.use(express.json())
app.use('style', express.static('./client/styles.css'))

let rollbar = new Rollbar({
    accessToken: "2ed0a5412b634cbd967f10674691d898",
    captureUncaught: true, 
    captureUnhandledRejections: true
})

// const ctrl = require('./controllers/controller')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"))
    rollbar.info('html file served succesfully')
}) 


const port = process.env.PORT || 4000


app.listen(port, () => console.log(`Listening on port ${port}`))