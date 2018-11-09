const express = require('express')
const app = express()
// const routes = require('./routes/routes')
const layout = require('./views/layout')

const { db } = require('./models')

const morgan = require('morgan')

app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send(layout())
})

const PORT = 3000

db.authenticate().then(() => {
  console.log('connected to the database')
})

app.listen(PORT, () => {
  console.log('connected to: ', PORT)
})
