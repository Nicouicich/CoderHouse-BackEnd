const express = require('express')
const router = express.Router()

let products = [
  {
    title: 'Escuadra',
    price: 1111.45,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    id: 1,
  },
  {
    title: 'Calculadora',
    price: 234.56,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
    id: 2,
  },
  {
    title: 'Globo Terráqueo',
    price: 345.67,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
    id: 3,
  },
  {
    title: 'Hoja',
    price: 45,
    thumbnail: 'https',
    id: 4,
  },
]

router.get('/', (req, res) => {
  res.status(201).json({
    data: products,
  })
})

router.get('/:id', (req, res) => {
  const idBuscado = req.params.id
  const id = products.findIndex((prod) => prod.id == idBuscado)
  // container
  //   .read()
  //   .then((resp) => {
  //     res.send(resp.find((prod) => prod.id == idBuscado))
  //   })
  //   .catch((err) => res.send(err))
  if (id != -1)
    res.status(201).json({
      data: products[id],
  })
  res.status(404).json({
    msg: 'Producto inexistente',
  })
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

router.post('/', (req, res) => {
  const searchId = Number(req.params.id)
  const body = req.body




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
    const newProduct = {
      id :products.length+1,
      title: body.title,
      price: body.price,
      thumbnail: body.thumbnail
  
    }

  products.push(newProduct)

  res.status(201).json({
    data: newProduct,
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
