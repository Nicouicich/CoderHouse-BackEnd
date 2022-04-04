const fs = require('fs')
const path = require('path')
const express = require('express')

class Container {
  constructor(fileName) {
    this.fileName = fileName
  }

  async read() {
    try {
      const data = await fs.promises.readFile(this.fileName, 'utf-8')
      return JSON.parse(data)
    } catch (err) {
      console.log('Archivo vacio')
    }
  }

  async write(product) {
    try {
      let id = 1
      let arr = []
      let data = await this.read()

      if (product == 0) {
        await fs.promises.writeFile(this.fileName, '')
        return 'Todos los productos eliminados con exito'
      } else {
        product.id = id
        if (data === undefined) arr = [product]
        else {
          for (let item of data) {
            arr.push(item)
            if (id < item.id) id = item.id
          }
          product.id = id + 1
          arr.push(product)
        }
        arr = JSON.stringify(arr, null, '\t')
        await fs.writeFile(this.fileName, arr)
        return `El producto se guardo correctamente producto se guardo correctamente con el ID: ${product.id}`
      }
    } catch (err) {
      console.log(err)
    }
  }

  async deleteID(id) {
    try {
      let arr = []
      let deletedID = false
      let data = await this.read()
      for (let item of data) {
        // si le pasan un id para borrar directamente no lo escribo en el nuevo array y seteo deletedID en true
        if (item.id != id) arr.push(item)
        else deletedID = true
      }
      arr = JSON.stringify(arr, null, '\t')
      await fs.writeFile(this.fileName, arr)
      if (deletedID)
        return `El producto con el ID ${id} fue eliminado con exito`
      else return 'Producto inexistente'
    } catch (err) {
      console.log(err)
    }
  }

  save(product) {
    this.write(product)
      .then((resp) => {
        console.log(resp)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async getById(id) {
    return await this.read()
      .then((resp) => {
        if (id > 0) {
          const product = resp.find((element) => element.id == id)
          if (product) return product
          else throw new Error(null)
        } else console.log('ID incorrecto')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getAll() {
    this.read()
      .then((resp) => {
        console.log(resp)
      })
      .catch((err) => {
        console.log('Usuario no encontrado')
      })
  }

  deleteById(id) {
    this.deleteID(id)
      .then((resp) => {
        console.log(resp)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async getIDs() {
    return await this.read().then((item) => item.map((item) => item.id))
  }

  deleteAll() {
    this.write(0)
      .then((resp) => {
        console.log(resp)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const container = new Container('./productos.txt')

const obj = {
  title: 'Hoja',
  price: 45,
  thumbnail: 'https',
}
//container.save(obj)

async function getById(id) {
  return await container.getById(id)
}

async function showIDs() {
  return await container.getIDs()
}

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const port = 8080
const server = app.listen(port, () => {})

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

app.get('/productos', (req, res) => {
  // container
  //   .read()
  //   .then((resp) => {
  //     let arr = []
  //     resp.map((prod) => arr.push(prod))
  //     res.send(arr)
  //   })
  //   .catch((err) => res.send(err))
  res.status(201).json({
    data: products,
  })
})

app.get('/productos/:id', (req, res) => {
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

app.get('/productoRandom', (req, res) => {
  showIDs()
    .then((resp) => {
      let ids = []
      resp.forEach((element) => {
        ids.push(element)
      })
      let id = ids[Math.floor(Math.random() * ids.length)]
      getById(id)
        .then((resp) => res.send(resp))
        .catch((err) => console.log(res))
    })
    .catch((err) => console.log(err))
})

app.put('/productos/:id', (req, res) => {
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

app.post('/productos/', (req, res) => {
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


app.delete('/productos/:id', (req, res) => {
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
