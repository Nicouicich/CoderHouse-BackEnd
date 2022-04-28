import { Express, Router, Request, Response } from "express";
import { middlewareAuth } from "./middlewares/middlewares";
import {
  getCarts,
  newCart,
  getCartById,
  deleteCartByID,
  deleteAllCarts,
  deleteCartProductById,
  getCartProductsById,
  addCartProductById,
} from "../controllers/cart/carts";
import { Cart } from "../controllers/cart/Cart";
import { Product } from "../controllers/products/Product";

const router = Router();

router.post("/", middlewareAuth, (req: Request, res: Response) => {
  let timestamp = Date.now();
  const cart = new Cart(timestamp);
  newCart(cart).then((resp) => {
    res.status(201).send(resp);
  });
});

router.delete("/:id?", middlewareAuth, (req: Request, res: Response) => {
  if (req.params.id) {
    deleteCartByID(req.params.id)
      .then((resp) => {
        res.status(201).send(resp);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } else res.send("Id no ingresado");
});

router.get("/:id?/productos", (req, res) => {
  if (req.params.id) {
    getCartProductsById(req.params.id)
      .then((resp) => {
        res.status(201).send(resp);
      })

      .catch((err) => {
        res.status(400).json();
      });
  } else {
    res.send(404);
  }
});

router.post(
  "/:id?/productos",
  middlewareAuth,
  (req: Request, res: Response) => {
    const body = req.body;

    const product: Product = new Product(
      body.timestamp,
      body.nombre,
      body.descripcion,
      body.foto,
      body.precio,
      body.stock
    );
    addCartProductById(req.params.id, product)
      .then((resp) => {
        res.status(201).send(resp);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
);

router.delete(
  "/:id?/productos/:id_prod?",
  middlewareAuth,
  (req: Request, res: Response) => {
    const body = req.body;

    deleteCartProductById(req.params.id, req.params.id_prod).then((resp) => {
      res.status(201).send(resp);
    });
  }
);

router.get("/", (req, res) => {
  const cart = getCarts()
    .then((resp) => {
      res.status(201).send(resp);
    })

    .catch((err) => {
      res.status(400).json();
    });
});

export { router };
