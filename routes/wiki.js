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
  const page = await Page.findOne({ where: { slug: req.params.slug } })
  console.log(page)
  try {
    const author = await page.getAuthor()
    res.send(wikiPage(page, author))
  } catch (err) {
    next(err)
  }
})

module.exports = router
