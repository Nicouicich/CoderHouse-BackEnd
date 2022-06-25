import { Router, Request, Response } from "express";

const router = Router();

router.get('/' , (req: Request,res:Response) => {
  const msg = {
    directory: process.cwd(),
    actual_process: process.pid,
    nodejs_version : process.version,
    process_title: process.title,
    os: process.platform,
    memory: JSON.stringify(process.memoryUsage()) 
  }
  res.json(msg)
})


export { router };