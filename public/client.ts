// import { io } from "socket.io-client";

// const socket = io();

// let user:any = null
// socket.emit('askData')

// function sendData (data:any) {
//   const input = (<HTMLInputElement>document.getElementById("msg")).value
//   socket.emit('new-message',user,input)
// }
// function sendUser (data:any) {
//   user = (<HTMLInputElement>document.getElementById("user")).value
// }

// function render (data:any) {
//   var html:any = data.map ((elem:any,index:any) => {
//     return `<div>
//       <strong>Usuario: ${elem.user}</strong>:
//       <em>${elem.message}<em>
//     `
//   })
//   .join(' ')

//   (<HTMLInputElement>document.getElementById('messages')).innerHTML = html

// }

// socket.on('messages',  (data: any) => {
//   console.log('Recibi mensaje')
//   render(data)
// }) 