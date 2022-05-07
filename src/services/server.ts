import { DBService } from "../../models/SQLite3/SQLite3.databases";
import { getMessages, newMessage } from "../controllers/chat/chat";
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

    socket.on("new-message", (userData:string, data:string) => {
      if (userData!=null) {
        const info = {
          userData,
          data,
        };
        newMessage(info)
        // DBService.create("mensajes,",newMessage)
        let msgs = getMessages()
         //uso el .data porque devuelve un obj con el componente data, y si mando el obj completo tira error
        myServer.emit("messages",msgs)

      }
      else{
        alert("Ingresa un usuario")
      }
    })
    
    socket.on("askData", (data:any) => {
      console.log("Llego data");
      let msgs = DBService.get("mensajes", "")
      if(msgs){
        msgs = msgs.data
        socket.emit("messages", msgs);

      }
      console.log("hay mensajes:", msgs)
      
    });
  
  });

};

