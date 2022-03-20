const fs = require('fs/promises')
const path = require('path')

class Container {
  fileName

  constructor(fileName) {
    this.fileName = fileName
  }

  async read() {
    // Con esta funcion, al recibir un id < 0 se devuelven todo completo. Si tiene un ID, devuelve unicamente ese objeto ---
    try {
      const data = await fs.readFile(this.fileName, 'utf-8')
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
        await fs.writeFile(this.fileName, '')
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

  save = function (product) {
    this.write(product)
      .then((resp) => {
        console.log(resp)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getById(id) {
    this.read()
      .then((resp) => {
        let idFound

        if (id > 0) {
          const product = resp.find((element) => element.id === id)
          if (product) console.log(product)
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

container = new Container('./productos.txt')

const obj = {
  title: 'Hoja',
  price: 45,
  thumbnail: 'https',
}
container.save(obj)
// container.getById(4)
// container.deleteById(4)
// container.getAll()
// container.deleteAll()
