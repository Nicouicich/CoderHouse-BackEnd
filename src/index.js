const express = require('express')
const router = express.Router()
const productsRouter = require('./routes/products')
const newProductRouter = require('./routes/newProduct')

const path = require('path')
const { append } = require('express/lib/response')



router.use('/productos', productsRouter)
router.use('/newproduct', newProductRouter)


// router.get('/', (req, res) => {
//   res.render('main')
// })

module.exports = router