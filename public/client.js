import * as  normalizer from "./normalizer.js";
// const denormalizeData = require('./normalizer')

const socket = io.connect("http://localhost:8080", { forceNew: true });
let user = null;

socket.emit("askData");

function sendData() {
  const data = {
    author : {
      email: document.getElementById("email").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      alias: document.getElementById("alias").value,
      edad: document.getElementById("edad").value,
      avatar: document.getElementById("avatar").value,
    },
    mensaje:document.getElementById("mensaje").value,
  
  };
  socket.emit("new-message", data);
}


function render(data) {
  const mensajesContainer = document.getElementById('messages');

  const denormalizedData = denormalizeData(mensajes)
  console.log(denormalizedData);

	denormalizedData.forEach(mensaje => {
		let p = document.createElement('p');
		p.innerHTML = `
					<span class='mx-2 mensaje__email'>${mensaje.author.email}</span>
					<span class='mx-2 mensaje__time'>${mensaje.author.nombre}</span>
					<span class='mx-2 mensaje__text'>${mensaje.text}</span>`;
		mensajesContainer.appendChild(p);
	});

  document.getElementById("messages").innerHTML = html;
}


socket.on("messages", (data) => {
  if (data) {
    console.log("Recibi mensaje");
    render(data);
  }
});
