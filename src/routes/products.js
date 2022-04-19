const express = require('express')
const router = express.Router()
const Products = require('../controller/products')

router.get('/', (req, res) => {
  // res.status(201).json({
  //   data: products,
  // })
  products = Products.getProducts()
  res.render('main',{products})

})

router.get('/:id', (req, res) => {
  const idBuscado = req.params.id
  const id = products.findIndex((prod) => prod.id == idBuscado)

  // if (id != -1)
  //   res.status(201).json({
  //     data: products[id],
  // })
  // res.status(404).json({
  //   msg: 'Producto inexistente',
  // })
})

// router.get('/productoRandom', (req, res) => {
//   showIDs()
//     .then((resp) => {
//       let ids = []
//       resp.forEach((element) => {
//         ids.push(element)
//       })
//       let id = ids[Math.floor(Math.random() * ids.length)]
//       getById(id)
//         .then((resp) => res.send(resp))
//         .catch((err) => console.log(res))
//     })
//     .catch((err) => console.log(err))
// })

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
  res.redirect('/api/productos')
})

router.put('/:id', (req, res) => {
  const searchId = Number(req.params.id)
  const body = req.body
  const pos = products.findIndex((prod) => prod.id == searchId)

  if (pos==-1) {
    return res.status(404).json({
      msg: { error: 'Producto inexistente' },
    })
  }
  if (
    !body.title ||
    !body.price ||
    !body.thumbnail||
    typeof body.title != 'string' ||
    typeof body.price != 'number' ||
    typeof body.thumbnail != 'string'
  )
    return res.status(400).json({
      msg: 'Producto ingresado de manera incorrecta',
    })

  products[pos].title = body.title
  products[pos].price = body.price
  products[pos].thumbnail = body.thumbnail
  res.status(201).json({
    data: products[pos],
  })
})



router.delete('/:id', (req, res) => {
  const searchId = Number(req.params.id)
  const pos = products.findIndex((prod) => prod.id == searchId)

  if (pos==-1) {
    return res.status(404).json({
      msg: { error: 'Producto inexistente' },
    })
  }
  const arr = products.splice(pos,1)
 
  res.status(201).json({
    data: products,
  })
})

module.exports = router
