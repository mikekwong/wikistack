const express = require('express');
const router = express();

router.get('/', async (req, res, next) => {
  try {
    res.send('got to GET /wiki/'); 
  } catch (err){
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  try {
    res.send('got to POST /wiki/'); 
  } catch (err){
    next(err);
  }
})

router.get('/add', async (req, res, next) => {
  try {
    res.send('got to GET /wiki/add'); 
  } catch (err){
    next(err);
  }
})

module.exports = router;