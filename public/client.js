
const socket = io.connect('http://localhost:8080',{forceNew: true})
let user = null

socket.emit('askData')

function sendData (data) {
  const input = document.getElementById("msg").value
  socket.emit('new-message',user,input)
}
function sendUser (e) {
  user = document.getElementById("user").value
}

function render (data) {
  var html = data?.map ((elem,index) => {
    return `<div>
      <strong>Usuario: ${elem.nombre}</strong>:
      <em>${elem.mensaje}<em>
    `
  })
  .join(' ')
  
  document.getElementById('messages').innerHTML = html
  
}
socket.on('messages',  data => {
  if (data){
    console.log('Recibi mensaje')
    render(data)
  }
})