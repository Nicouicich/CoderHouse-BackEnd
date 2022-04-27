import { Express, Router } from "express";
import { router as productsRouter } from "./productos";
import { router as cartsRouter } from "./carrito";
const router = Router()

router.use('/productos', productsRouter)
router.use('/cart', cartsRouter)


export {router}