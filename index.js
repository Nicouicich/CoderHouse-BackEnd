const fs=require('fs/promises')
const path=require('path')

class Container {
  fileName


  constructor(fileName) {
    this.fileName=fileName
  }


  read=async (id) => {  // Con esta funcion, al recibir un id < 0 se devuelven todo completo. Si tiene un ID, devuelve unicamente ese objeto ---
    try {
      const data=await fs.readFile(this.fileName, 'utf-8')

      const info=JSON.parse(data)
      let idFound

      if (id>0) {
        idFound=info.find(element => element.id===id)
        if (idFound)
          return idFound
        else
          throw new Error(null)
      }
      else
        return info


    }
    catch (err) {
      console.log(err)
    }
  }


  write=async (product, deleteID) => {   //Esta funcion siempre agarra toda la data del archivo a partir de la funcion read.
    // -- Si deleteID (id a borrar) es > 0 significa que quiere borrar uno y en este caso no importa el parametro product
    // product vendria a ser el objeto a agregar en el archivo
    try {
      const data=await fs.readFile(this.fileName, 'utf-8')
      const resp=JSON.parse(data)
      let id=1
      let arr=[]
      let deletedID=false  //esta variable es para verificar que se haya borrado un producto

      if (deleteID>0) {
        for (let i in resp) { // si le pasan un id para borrar directamente no lo escribo en el nuevo array y seteo deletedID en true
          if (resp[i].id!=deleteID) {
            arr.push(resp[i])
            id=resp[i].id
          }
          else
            deletedID=true
        }
      }

      else { //Esto significa que no se quiere eliminar un producto, sino escribir uno en el archivo
        for (let i in resp) { // aca busco el mayor id, aunq no especifica que cuando se borra un id y al crearse uno nuevo este se reemplaza o asigna uno mas nuevo
          arr.push(resp[i])

          if (id<resp[i].id)
            id=resp[i].id

        }
      }
      if (deleteID<0) { //en este caso nunca se pidio borrar un producto
        product.id=id+1
        arr.push(product)
        arr=JSON.stringify(arr, null, '\t')
        await fs.writeFile(this.fileName, arr)
        return (`Producto guardado con exito, su ID es: ${product.id}` )
      }
      else {
        arr=JSON.stringify(arr, null, '\t')
        await fs.writeFile(this.fileName, arr)
        if (deletedID==true) //contempla el caso que no se haya borrado el producto porq el ID no existe
          return ("Producto eliminado con exito")
        else
          return ("Producto inexistente")
      }
    }

    catch (err) {
      console.log(err)
    }
  }

  save=function (product) {
    this.write(product, -1)
      .then((resp) => {
        console.log(resp)
      })
      .catch((err) => {
        console.log(err)
      })


  }

  getById (id) {
    this.read(id)
      .then((resp) => {
        console.log(resp)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getAll () {
    this.read()
      .then((resp) => {
        console.log(resp)
      })
      .catch((err) => {
        console.log("Usuario no encontrado")
      })
  }

  deleteById (id) {
    this.write("", id)
      .then((resp) => {
        console.log(resp)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  deleteAll () {

  }
}

container=new Container('./productos.txt')

const obj={
  "title": "Hoja",
  "price": 45,
  "thumbnail": "https"
}
container.save(obj)
container.deleteById(7)
container.getById(4)
container.getAll()
