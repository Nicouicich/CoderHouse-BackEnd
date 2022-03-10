class Usuario {
  nombre
  apellido
  libros = [{}]
  mascotas= []
  
  constructor (nombre, apellido, libros,mascotas ) {
    this.nombre = nombre
    this.apellido = apellido
    this.libros = libros
    this.mascotas = mascotas
  }

  getFullName () {
    return  `${this.nombre} `
  }
  addMascota (mascota){
    this.mascotas.push(mascota)
  }
  countMascotas (){
    return this.libros.len()
  }
  addBook(nombre, autor){
    this.libros.push({nombre,autor})
  }
  getBookNames() {
    let arr = this.libros.map((libro) => {
      return libro.nombre
    });
    return arr
  }
}

const usuario1 = new Usuario ("Nicolas", "Uicich",  [{nombre: 'El señor de las moscas',autor: 'William Golding'}, {nombre: 'Fundacion', autor: 'Isaac Asimov'}], ["perro", "gato"])
// usuario1.addBook("transformers 1", "michael bay")
// usuario1.addBook("transformers 2", "michael bay")
// usuario1.addBook("transformers 3", "michael bay")
// usuario1.addBook("transformers 4", "michael bay")

// usuario1.addBook("transformers 5", "michael bay")

console.log(usuario1.getFullName())