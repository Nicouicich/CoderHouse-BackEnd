import { Express, Router, Request, Response } from "express";
import { Product } from "../controllers/products/Product";
import { middlewareAuth } from "./middlewares/middlewares";
import { DBService } from "../models/MariaDB/MariaDB";

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  checkBodyProduct,
} from "../controllers/products/products.mongo";
const router = Router();

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/',middlewareAuth, createProduct);

router.put('/:id', checkBodyProduct,updateProduct);

router.delete('/:id',middlewareAuth, deleteProduct);


export { router };
