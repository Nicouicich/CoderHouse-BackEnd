const express = require('express')
const router = express.Router()
const productsRouter = require('./products')
const path = require('path')
const { append } = require('express/lib/response')



router.use('/productos', productsRouter)

router.get('/', (req, res) => {
  res.render('main')
})

module.exports = router