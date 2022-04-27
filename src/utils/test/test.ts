import { prototype } from "events";
import {v4 as uuid } from "uuid";
import { Product } from "../products/Product";
import {newCart,deleteAllCarts } from "../cart/carts";
import { newProduct, deleteAllProducts } from "../products/products";
import { Cart } from "../cart/Cart";


async function newTestProducts() {
  await deleteAllProducts()
  await deleteAllCarts()

  for (let j = 0 ; j<3 ; j++){ //creo carritos
    let timestamp: number = Date.now();
    const cart = new Cart(timestamp)

    for (let i = 0; i < 5; i++) { //Creo productos
      timestamp = Date.now();
      let nombre: string = `nombre ${i}`;
      let descripcion: string = `descripcion ${i}`;
      let foto: string = `foto ${i}`;
      let precio: number = i;
      let stock: number = i;
  
      const product = new Product(
        timestamp,
        nombre,
        descripcion,
        foto,
        precio,
        stock
      );
      await newProduct(product)
      cart.newProduct(product) 
    }
    newCart(cart)

  }

}
export {newTestProducts}