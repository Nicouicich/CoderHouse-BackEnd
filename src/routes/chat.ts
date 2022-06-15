import { Express, Router, Request, Response } from "express";
import { DBService } from "../models/MariaDB/MariaDB";
import { getMessages, newMessage } from "../controllers/chat";
import { addMessage } from "../controllers/chat2";
import { IMessage } from "../models/schemas/chat";
import { middlewareAuth } from "./middlewares/middlewareAuth";

const router = Router();

router.get('/',middlewareAuth, (req, res) => {
  res.render('index')
})
//hay q configurar para addmessage antes q newmessage
router.post("/",(req: Request, res: Response)=>{
  const { nombre, mensaje } = req.body;
    const data = {
      nombre,
      mensaje,
    };
  let msg = newMessage(data)
  res.json({
    data: msg,
  });
});

export { router };