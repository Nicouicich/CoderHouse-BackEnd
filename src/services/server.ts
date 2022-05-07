import { DBService } from "../../models/SQLite3/SQLite3.databases";

const http = require("http");
const io = require("socket.io");
let alert = require('alert'); 



let day = new Date();
let date =
  day.getDate() +
  "/" +
  (day.getMonth() + 1) +
  "/" +
  day.getFullYear() +
  "  " +
  day.getHours() +
  ":" +
  day.getMinutes() +
  ":" +
  day.getSeconds();




export default function setWebSocket (server:any)  {
  const myServer = io(server);

  myServer.on("connection", (socket:any) => {
    console.log("Un cliente se conecto en el socket: ", socket.id);

    socket.on("new-message", (userData:any, data:any) => {
      if (userData!=null) {
  
        const newMessage = {
          nombre: userData,
          mensaje: data,
        };
        
        DBService.create("mensajes,",newMessage)
        let msgs = DBService.get("mensajes","")
        myServer.emit("messages",msgs)

      }
      else{
        alert("Ingresa un usuario")
      }
    })
      


    socket.on("askData", (data:any) => {
      console.log("Llego data");
      const msgs = DBService.get("mensajes", "")
      
      console.log("hay mensajes:", msgs)
      socket.emit("messages", msgs);
    });
  
  });

};

