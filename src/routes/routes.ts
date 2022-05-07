import { Express, Router } from "express";
import { router as productsRouter } from "./productos";
import { router as cartsRouter } from "./carrito";
import {router as chatRouter} from './chat'
const router = Router()

router.use('/productos', productsRouter)
//router.use('/cart', cartsRouter)
router.use ('/chat',chatRouter)


export {router}