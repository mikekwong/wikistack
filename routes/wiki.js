const express = require('express')
const router = express()
const { Page } = require('../models')
const { addPage } = require('../views')

router.get('/', async (req, res, next) => {
  res.send('')
})

router.post('/', async (req, res, next) => {
  console.log(req.body)
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  })

  try {
    await page.save()
    res.redirect('/')
  } catch (err) {
    next(err)
  }
})

router.get('/add', async (req, res, next) => {
  try {
    res.send(addPage())
  } catch (err) {
    next(err)
  }
})

module.exports = router
