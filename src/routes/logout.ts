import { middlewareAuth } from "./middlewares/middlewareAuth";
import { Router, Request,Response } from "express";

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

const router = Router()

router.post('/' ,(req: Request, res: Response) => {
  req.session.destroy(function(err) {
    if(err) {
        res.json('No se pudo desloguear')
    } else {
        console.log("logout successful");
        return res.redirect('/api/login');
    }
});
})
router.get('/' ,(req: Request, res: Response) => {
  req.session.destroy(function(err) {
    if(err) {
        res.json('No se pudo desloguear')
    } else {
        console.log("logout successful");
        return res.redirect('/api/login');
    }
});
})


export {router}