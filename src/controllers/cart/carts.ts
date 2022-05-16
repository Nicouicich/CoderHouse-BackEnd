import { NextFunction, Request, Response } from 'express';
import { deleteProduct as deleteProductById, getItemById } from "../products/products.mongo";
import { CartModel } from "../../models/schemas/cart";
import { IDtoProduct } from "../../models/schemas/products";

export const getAllCarts = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const carts = await CartModel.find();
    res.json({
      data: carts,
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({
        error: err.message,
        stack: err.stack,
      });
    else next(err);
  }
};


export const createCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idProduct = req.body.idProduct;
    const quantity: number = Number(req.body.quantity)
    const product = await getItemById(idProduct)

    if (product) {
      if (quantity > product.stock) {
        res.json({
          data: "The quantity of the added product is greater than the quantity available in stock.",
        });
      }
      let newProduct: IDtoProduct = {
        id: product._id.toString(),
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio,
        stock: product.stock,
        categoryId: product.categoryId,
        cantidad: quantity,
      }
      const products = [newProduct]
      let newCart = await CartModel.create({
        products
      });

      res.json({
        data: newCart,
      });
    }
    else {
      res.json({
        data: "To create a cart, you need to send an object id with its cuantity within the post body",
      });
    }
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({
        error: err.message,
        stack: err.stack,
      });
    else next(err);
  }
};


export const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await CartModel.findByIdAndDelete(id);

    res.json({
      msg: 'Cart deleted',
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({
        error: err.message,
        stack: err.stack,
      });
    else next(err);
  }
};


export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const idProduct = req.body.idProduct;
    const quantity: number = Number(req.body.quantity)
    const product = await getItemById(idProduct)

    let cart = await CartModel.findById(id);

    if (!cart) {

      return res.status(404).json({
        msgs: 'Cart not found!',
      });
    }
    if (product) {
      //Primero reviso que no este el producto
      let modified: boolean = false
      const productos = cart.products.map(prod => {
        if (prod.id == idProduct) {
          if (prod.cantidad + quantity < prod.stock){
            prod.cantidad += quantity 
            modified = true
          }
          else{
            return res.json({
              data: "The quantity of the added product is greater than the quantity available in stock.",
            });
          }
        }
        return prod
      })
      if (modified){

        await CartModel.findByIdAndUpdate(id, { products: productos })
        return res.json({
          msgs: cart,
        });
      }
      else {
        if (quantity > product.stock) {
          return res.json({
            data: "The quantity of the added product is greater than the quantity available in stock.",
          });
        }
        let newProduct: IDtoProduct = {
          id: product._id.toString(),
          nombre: product.nombre,
          descripcion: product.descripcion,
          precio: product.precio,
          stock: product.stock,
          categoryId: product.categoryId,
          cantidad: quantity,
        }

        const cartUpdated = await CartModel.updateOne(
          { _id: cart._id },
          { $push: { products: newProduct } }
        )

        res.json({
          data: cart,
        });
      }

    }

    else
      return res.json({
        msg: 'Product does not exists',
      });
  } catch (err) {
    if (err instanceof Error)
      return err.message
    else next(err);
  }
};


export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const idProduct = req.body.idProduct;
    const quantity: number = Number(req.body.quantity)
    const cart = await CartModel.findById(id)


    if (!cart) {

      return res.status(404).json({
        msgs: 'Cart not found!',
      });
    }
    const product = await getItemById(idProduct)
    if (product) {
      if (quantity > product.stock) {
        return res.json({
          data: "The quantity of the added product is greater than the quantity available in stock.",
        });
      }
      else {
        let modified: boolean = false
        const productos = cart.products.map(prod => {
          if (prod.id == idProduct) {
            prod.cantidad = quantity
            modified = true
          }
          return prod
        })
        await CartModel.findByIdAndUpdate(id, { products: productos })
        if (modified) {

          return res.json({
            data: cart,
          });
        }
        else
          return res.json({
            data: "Product not found in cart",
          });

      }
    }
    else
      return res.json({
        msg: 'Product does not exists',
      });
  } catch (err) {
    if (err instanceof Error)
      return res.status(500).json({
        error: err.message,
        stack: err.stack,
      });
    else next(err);
  }
};


export const getCartById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const cart = await CartModel.findById(id);

    if (!cart)
      return res.status(404).json({
        msgs: 'Cart not found!',
      });

    res.json({
      cart
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({
        error: err.message,
        stack: err.stack,
      });
    else next(err);
  }
};
