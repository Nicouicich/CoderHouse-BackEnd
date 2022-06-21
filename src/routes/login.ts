import { middlewareAuth } from "./middlewares/middlewareAuth";
import { Router, Request,Response, NextFunction } from "express";
import passport from "passport";
import util from 'util';
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

const passportOptions = {}


const router = Router()
const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  console.log('Is Authenticated')
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) return res.status(401).json({ msg: 'Unathorized' });

  next();
}

const isAdmin = (req: Request, res: Response, next:NextFunction) => {
  console.log('Is Admin Middleware')
  const user: any = req.user
  const adm = user.admin
  console.log("Soy admin? :" ,adm)
  // const msg = util.inspect(req.session, true, 7, true)
  // res.json(msg);

  if (!adm) return res.status(401).json({ msg: 'Unathorized - Admin Only' });

  next();
};


router.post('/',  passport.authenticate('login', passportOptions),  (req, res) => {
    // res.json({ msg: 'Welcome!', user: req.user });
    res.status(200).redirect('/api/chat')
  },
);


// router.get('/', isLoggedIn, isAdmin, async (req, res) => {
//   // const msg = util.inspect(req.session, true, 7, true)
//   // res.json(msg);
//   res.json({
//     mgs: "HOLA",
//     session : req.session,
//     user: req.user
//   })
// })

router.get('/secret-endpoint', middlewareAuth, (req: Request, res:Response) => {
  if (req.session.info){
    req.session.info.contador++;
    res.json({
      msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces`,
    });
  }
  else{
    res.status(401).redirect('/api/login')
  }
  
});

router.get('/' , (req: Request,res:Response) => {
  res.render('login', { })
})



export {router}