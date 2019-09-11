const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const Nexmo = require('nexmo')
const socket = require('socket.io')

require('dotenv').config()

const nexmo = new Nexmo(
  {
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
  },
  { debug: true }
)
// Initialize application
const app = express()

app.set('view engine', 'html')
app.engine('html', ejs.renderFile)

// Set Public folder for static assets
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))

// Body Parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Index Route
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  // res.send(req.body)
  // console.log(req.body)
  const from = '15055224541'
  const to = req.body.number
  const text = req.body.text

  nexmo.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err)
    } else {
      console.dir(responseData)
      // Get data from response
      const data = {
        id: responseData.messages[0]['message-id'],
        number: responseData.messages[0]['to']
      }
      // Emit to the client
      io.emit('smsStatus', data)
    }
  })
})

const port = 8000

// Start server

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

// connect to socket.io
const io = socket(server)
io.on('connection', socket => {
  console.log('Connected to the socket')
  io.on('disconnect', () => {
    console.log('disconnected')
  })
})
