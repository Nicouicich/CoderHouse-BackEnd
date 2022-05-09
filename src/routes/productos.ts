import { Express, Router, Request, Response } from "express";
import { Product } from "../controllers/products/Product";
import { middlewareAuth } from "./middlewares/middlewares";
import { DBService } from "../models/MariaDB/MariaDB";

import {
  getProducts,
  newProduct,
  deleteByID,
  upgradeById,
  getProductById,
} from "../controllers/products/products";
const router = Router();

router.get('/', getProducts);

router.get('/:id', getProductById);

router.post('/',middlewareAuth, newProduct);

router.put('/:id', upgradeById);

router.delete('/:id',middlewareAuth, deleteByID);


export { router };
