const express = require('express')
const router = express()
const { Page, User } = require('../models')
const { addPage, wikiPage, main } = require('../views')

router.get('/', async (req, res, next) => {
  try {
    const allPages = await Page.findAll()
    res.send(main(allPages))
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  // console.log(req.body)
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  })

  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    })
    const page = await Page.create(req.body)
    page.setAuthor(user)

    await page.save()
    res.redirect(`/wiki/${page.slug}`)
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

router.get('/:slug', async (req, res, next) => {
  console.log(wikiPage)
  try {
    res.send(wikiPage(req.body))
  } catch (err) {
    next(err)
  }
})

module.exports = router
