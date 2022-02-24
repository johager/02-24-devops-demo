const express = require('express')
const path = require('path')

const app = express()

const port = process.env.PORT || 4545
// process.env.PORT to get the port from heroku's env file

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use(express.static(path.join(__dirname, '../public')))

app.listen(port, () => { console.log(`running on port ${port}`)})

const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '3683e4e94fd64cdcab2a3b946093a710',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

let students = []

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('student was added successfully', {author: 'Scott', type: 'manual', student: name})

    res.status(200).send(students)
})

app.use(rollbar.errorHandler())