const express = require('express')
const app = express()
const layout = require('./views/layout')
const wikiRouter = require('./routes/wiki')
const userRouter = require('./routes/user')
const { db } = require('./models/index')

const morgan = require('morgan')

app.use('/wiki', wikiRouter)
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

const init = async () => {
  await db.sync()
  app.listen(PORT, () => {
    console.log('connected to: ', PORT)
  });
}

init();
