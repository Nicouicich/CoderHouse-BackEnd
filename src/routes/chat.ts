import {Router, Request, Response } from "express";
import { middlewareAuth } from "./middlewares/middlewareAuth";
import { addMessage } from "../controllers/chat2";
import { IMessage } from "../models/schemas/chat";

const router = Router();

router.get('/',middlewareAuth, (req, res) => {
  res.render('index')
})
//hay q configurar para addmessage antes q newmessage
router.post("/",(req: Request, res: Response)=>{
  const { author, mensaje } = req.body;
    const data : IMessage= {
      author,
      mensaje,
    };
  let msg = addMessage(data)
  res.json({
    data: msg,
  });
});

export { router };