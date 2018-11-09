const express = require('express')
const app = express()
// const routes = require('./routes/routes')

const morgan = require('morgan')

app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello world')
})

const PORT = 1337

app.listen(PORT, () => {
  console.log('connected to: ', PORT)
})
