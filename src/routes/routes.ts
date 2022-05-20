import { Express, Router } from "express";
import { router as productsRouter } from "./productos";
import { router as cartsRouter } from "./cart";
import {router as chatRouter} from './chat'
import {router as categoryRouter} from "./categories";

const router = Router()

router.use('/products', productsRouter)
router.use('/carts', cartsRouter)
router.use ('/chat',chatRouter)
router.use ('/categories',categoryRouter)


export {router}