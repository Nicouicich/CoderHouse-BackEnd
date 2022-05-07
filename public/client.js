
const socket = io.connect('http://localhost:8080',{forceNew: true})
let user = null

socket.emit('askData')

function sendData (data) {
  console.log("sendata")
  const input = document.getElementById("msg")
  socket.emit('new-message',user,input.value)
}
function sendUser (e) {
  user = document.getElementById("user").value
}

function render (data) {
  var html = data.map ((elem,index) => {
    return `<div>
      <strong>Usuario: ${elem.user}</strong>:
      <em>${elem.message}<em>
    `
  })
  .join(' ')
  
  document.getElementById('messages').innerHTML = html
  
}
socket.on('messages',  data => {
  console.log('Recibi mensaje')
  render(data)
})