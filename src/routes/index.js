const express = require('express')
const router = express.Router()
const productsRouter = require('./products')

router.get('/',(req,res) => {
  res.json({
    msg: "Pagina principal"
  })
})

router.use ('/productos', productsRouter)


module.exports = router