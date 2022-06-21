import util from 'util';
import passport from 'passport';
import { NextFunction, Router, Request, Response } from "express";
import { Callback } from 'mongoose';

const router = Router();

const passportOptions = {};


router.post('/', (req: Request, res: Response, next) => {
  passport.authenticate('signup', passportOptions, (err, user, info) => {
    console.log('Info SIGNUP');
    console.log(err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) return res.status(401).json(info);

    res.json({ msg: 'signup OK' });
  })(req, res, next);
});

router.get('/' , (req: Request,res:Response) => {
  res.render('signup', { })
})


export { router };