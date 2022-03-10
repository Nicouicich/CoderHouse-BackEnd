class Usuario {
  nombre
  apellido
  libros = [{}]
  mascotas = []
  
  constructor (nombre, apellido, libros,mascotas ) {
    this.nombre = nombre
    this.apellido = apellido
    this.libros = libros
    this.mascotas = mascotas
  }

  getFullName () {
    return  `${this.nombre} + ${this.apellido}`
  }
  addMascota (mascota){
    this.mascotas.push(mascota)
  }
  countMascotas (){
    return this.mascotas.length
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

const usuario1 = new Usuario ("Elon", "Musk",  [{nombre: 'El señor de las moscas',autor: 'William Golding'}, {nombre: 'Fundacion', autor: 'Isaac Asimov'}], ["perro", "gato"])

console.log( "Cantidad de mascotas: ", usuario1.countMascotas())
console.log("Libros: ", usuario1.getBookNames())
console.log("Nombre Completo: ", usuario1.getFullName())
