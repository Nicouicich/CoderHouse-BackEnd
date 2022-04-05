const fs = require('fs')
const path = require('path')
const express = require('express')
const mainRouter = require ('./src/routes/index.js')

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

app.use('/api/', mainRouter)