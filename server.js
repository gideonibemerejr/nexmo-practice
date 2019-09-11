const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const nexmo = require('nexmo')
const socket = require('socket.io')

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

const port = 8000

// Start server

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
