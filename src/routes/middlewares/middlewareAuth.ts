import {Request, Response,NextFunction } from "express";

declare module 'express-session' {
  export interface SessionData {
      info: {
          loggedIn: boolean,
          contador: number,
          username: string,
          admin: boolean,
      }
  }
}

const middlewareAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.session)
  if (req.session.info && req.session.info.loggedIn) next();
  else{
    // res.status(401).json({ msg: 'no estas autorizado' });
    res.status(401).redirect('/api/login')
  }
}

export {middlewareAuth}