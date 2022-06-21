import {Request, Response,NextFunction } from "express";



// const middlewareAuth = (req: Request, res: Response, next: NextFunction) => {
//   console.log("SESION:" ,req.session)
//   if (req.session.info && req.session.info.loggedIn) next();
//   else{
//     // res.status(401).json({ msg: 'no estas autorizado' });
//     res.status(401).redirect('/api/login')
//   }
// }
const middlewareAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log('Is Authenticated')
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) return res.status(401).json({ msg: 'Unathorized' });

  next();
}

export {middlewareAuth}