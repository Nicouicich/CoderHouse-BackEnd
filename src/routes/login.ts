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

const users = [
  {
    username: 'pepe',
    password : 'BokitaTheBiggest',
    admin: true,
  },
  {
    username: 'juancarlos',
    password : 'BokitaTheBiggest',
    admin: false,
  }
]



router.post('/' ,(req: Request, res: Response) => {
  const { username, password } = req.body;

  const index = users.findIndex((aUser) => aUser.username === username && aUser.password === password);

  if(index < 0)
    res.status(401).json({ msg: 'no estas autorizado' });
    
  else {
    
    const user = users[index];
    req.session.info = {
      loggedIn: true,
      contador : 1,
      username : user.username,
      admin : user.admin,
    };
    res.json({msg: 'Bienvenido!!'})
  }
})


router.get('/secret-endpoint', middlewareAuth, (req: Request, res:Response) => {
  if (req.session.info){
    req.session.info.contador++;
    res.json({
      msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces`,
    });
  }
  else{
    res.redirect('/api/login')
  }
  
});

router.get('/' , (req: Request,res:Response) => {
  res.render('login', { })
})



export {router}