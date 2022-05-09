import { Request, Response } from "express";
import { DBService } from "../../models/SQLite3/SQLite3.databases";

const tableName = "mensajes";

export const getMessages = async () => {
  try {
    const msgs = await DBService.get(tableName,"");
    
    return msgs
  } catch (err) {
    return null
    
  }
};


export const newMessage = async (data:any) => {
  try {
    // const { nombre, mensaje } = req.body;

    // const data = {
    //   nombre,
    //   mensaje,
    // };

    const newId = await DBService.create('mensajes', data);

    const newMessage = await DBService.get(tableName, newId);
    return newMessage
  } catch (err) {
    return err
    // res.status(500).json({
    //   // error: err.message,
    //   // stack: err.stack,
    // });
  }
};
