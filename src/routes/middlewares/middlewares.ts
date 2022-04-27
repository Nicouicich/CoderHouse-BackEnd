import {Express,Router, Request, Response,NextFunction } from "express";

let authenticated : boolean = true

const middlewareAuth = (req: Request, res: Response, next: NextFunction) => {
  if(authenticated)
    next()
  else
    res.status(401).send(
      "Permisos insuficientes"
    )
}

export {middlewareAuth}