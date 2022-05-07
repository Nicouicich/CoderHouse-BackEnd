import { Express, Router, Request, Response } from "express";
import { DBService } from "../../models/MariaDB/MariaDB";
import { getMessages, newMessage } from "../controllers/chat/chat";

const router = Router();

router.get('/', (req, res) => {
  res.render('index')
})

router.post("/", newMessage);

export { router };