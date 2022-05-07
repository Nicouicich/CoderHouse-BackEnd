import { Request, Response } from "express";
import { DBService } from "../../../models/MariaDB/MariaDB";

const tableName = "mensajes";

export const getMessages = async () => {
  try {
    const msgs = await DBService.get(tableName,"");

    return msgs
  } catch (err) {
    return null
    
  }
};


export const newMessage = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion } = req.body;

    const data = {
      nombre,
      descripcion,
    };

    const newId = await DBService.create(tableName, data);

    const newMessage = await DBService.get(tableName, newId);

    res.json({
      data: newMessage,
    });
  } catch (err) {
    res.status(500).json({
      // error: err.message,
      // stack: err.stack,
    });
  }
};
