const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')


const app = express()
const names = []
app.use(express.json())
app.use('/style', express.static('./client/styles.css'))
app.use('/javascript', express.static('.client/main.js'))

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

app.post('/api/name', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    const index = names.findIndex(studentName=> studentName === name)

    if(index === -1 && name !== ''){
        names.push(name)
        rollbar.log('Name  added successfully', {author: 'Austin'})
        res.status(200).send(names)
    } else if (name === ''){
        rollbar.error('No name giver')
        res.status(400).send('must provide a name.')
    } else {
        rollbar.error('Name already added')
        res.status(400).send('that student already exists')
    }

})


const port = process.env.PORT || 4000

app.use(rollbar.errorHandler())


app.listen(port, () => console.log(`Listening on port ${port}`))