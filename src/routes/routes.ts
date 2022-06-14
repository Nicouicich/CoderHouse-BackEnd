import { Express, Router } from "express";
import { router as productsRouter } from "./productos";
import { router as cartsRouter } from "./cart";
import {router as chatRouter} from './chat'
import {router as categoryRouter} from "./categories";
import {router as productostestRouter} from "./productos-test";
import { router as loginRouter } from "./login";
import { router  as logoutRouter} from "./logout";
const router = Router()

router.use('/products', productsRouter)
router.use('/carts', cartsRouter)
router.use ('/chat',chatRouter)
router.use ('/categories',categoryRouter)
router.use('/productos-test',productostestRouter)
router.use('/login',loginRouter)
router.use('/logout',logoutRouter)


export {router}