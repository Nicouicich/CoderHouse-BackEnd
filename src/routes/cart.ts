import { Router } from "express";
import { middlewareAuth } from "./middlewares/middlewareAuth";
import {
  getAllCarts,
  createCart,
  addProduct,
  getCartById,
  deleteCart,
  updateProduct
} from "../controllers/carts";


export const router = Router();

router.get('/', getAllCarts);
router.get('/:id', getCartById);

router.post('/',middlewareAuth, createCart);
router.post('/:id',middlewareAuth, addProduct);

router.put('/:id',updateProduct);

router.delete('/:id',middlewareAuth, deleteCart);
