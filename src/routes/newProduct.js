const express = require('express')
const router = express.Router()
const Products = require('../controller/products')

router.get('/', (req, res) => {
  res.render('newProduct')
})

router.post('/', (req, res) => {
  const searchId = Number(req.params.id)
  const body = req.body
  console.log(body)
  // if (
  //   !body.title ||
  //   !body.price ||
  //   !body.thumbnail ||
  //   typeof body.title != 'string' ||
  //   typeof body.price != 'number' ||
  //   typeof body.thumbnail != 'string'
  // )
  //   return res.status(400).json({
  //     msg: 'Producto ingresado de manera incorrecta',
  //   })

  const newProduct = {
    title: body.title,
    price: Number(body.price),
    thumbnail: body.thumbnail,
  }
  Products.save(newProduct)

  // res.status(201).json({
  //   data: newProduct,
  // })
  res.redirect('/api/newproduct')
})
module.exports = router
