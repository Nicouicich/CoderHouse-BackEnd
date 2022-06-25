import {random} from '../utils/random'
import{Router, Request, Response } from "express";
import { fork } from 'child_process';
import path from 'path';

const router = Router();

const scriptPath = path.resolve(__dirname,'../utils/random')

router.get('/' , (req: Request,res:Response) => {
  const scriptRandom = fork(scriptPath)
  if (req.query.cantidad)
    scriptRandom.send(Number(req.query.cantidad))
  else
    scriptRandom.send('start')

  scriptRandom.on('message',result => {
    res.json({
      msg:result
    })
  })

})


export { router };