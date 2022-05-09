import { Express, Router, Request, Response } from "express";
import { DBService } from "../models/MariaDB/MariaDB";
import { getMessages, newMessage } from "../controllers/chat/chat";

const router = Router();

router.get('/', (req, res) => {
  res.render('index')
})

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