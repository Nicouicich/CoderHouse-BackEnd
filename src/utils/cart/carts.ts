import { Cart } from "./Cart";
import fs from "fs";
import path from "path";
import { deleteByID as deleteProductById } from "../products/products";
import { Product } from "../products/Product";

const fileName: string = path.resolve(__dirname, "carts.txt");
async function getCarts() {
  try {
    const data: string = await fs.promises.readFile(fileName, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log("Archivo vacio");
  }
}

async function newCart(cart: Cart) {
  try {
    let arr = [];
    let data: string = await getCarts();
    if (!data) arr = [cart];
    else {
      for (let cart of data) {
        arr.push(cart);
      }
      arr.push(cart);
    }
    let info = JSON.stringify(arr, null, "\t");
    await fs.promises.writeFile(fileName, info);
    return `El carrito se guardo correctamente producto se guardo correctamente con el ID: ${cart.id}`;
  } catch (err) {
    console.log(err);
  }
}

async function deleteCartByID(id: string) {
  try {
    let arr = [];
    let deletedID: boolean = false;
    let data = await getCarts();
    for (let cart of data) {
      // si le pasan un id para borrar directamente no lo escribo en el nuevo array y seteo deletedID en true
      if (cart._id != id) arr.push(cart);
      else deletedID = true;
    }
    const info = JSON.stringify(arr, null, "\t");
    await fs.promises.writeFile(fileName, info);
    if (deletedID) return `El carrito con el ID ${id} fue eliminado con exito`;
    else return "Carrito inexistente";
  } catch (err) {
    console.log(err);
  }
}

async function getCartById(id: string) {
  try {
    const data: string = await fs.promises.readFile(fileName, "utf-8");
    const info = JSON.parse(data);
    let found = false;
    for (let cart of info) {
      // si le pasan un id para borrar directamente no lo escribo en el nuevo array y seteo deletedID en true
      if (cart._id == id) return cart;
    }
    return null;
  } catch (err) {
    console.log("Archivo vacio");
  }
}

async function deleteAllCarts() {
  await fs.promises.writeFile(fileName, "");
}

async function deleteCartProductById(cart_id: string, prod_id: string) {
  const carts = await getCarts();
  const cart = await getCartById(cart_id);
  if (cart) {
    try {
      let info = [];
      let deletedID: boolean = false;
      for (let auxcart of carts) {
        let arr = [];
        let products = cart._products;

        if (auxcart._id == cart_id) {
          //auxcart es cada carrito
          for (let item of products) {
            // si le pasan un id para borrar directamente no lo escribo en el nuevo array y seteo deletedID en true
            if (item._id != prod_id) arr.push(item);
            else deletedID = true;
          }
          auxcart._products = arr;
        }
        info.push(auxcart);
      }
      let data = JSON.stringify(info, null, "\t");
      await fs.promises.writeFile(fileName, data);
      if (deletedID)
        return `El producto con el ID ${prod_id} del carrito ${cart_id} fue eliminado con exito`;
      else return "Producto inexistente";
    } catch (err) {
      console.log(err);
    }
  } else {
    return "Carrito no encontrado";
  }
}

async function getCartProductsById(id: string) {
  try {
    const data: string = await fs.promises.readFile(fileName, "utf-8");
    const info = JSON.parse(data);
    let found = false;
    for (let cart of info) {
      if (cart._id == id) return cart._products;
    }
    return null;
  } catch (err) {
    console.log("Archivo vacio");
  }
}
async function addCartProductById(id: string, newProduct: Product) {
  try {
    let carts = [];
    let data: string = await fs.promises.readFile(fileName, "utf-8");
    let info = JSON.parse(data);
    let found: boolean = false;
    if (!data)
      return "No se puede agregar un producto a un carrito inexistente";
    else {
      for (let cart of info) {
        if (cart._id == id) {
          //Se encontro el carrito para agregar el producto, hay que verificar si el producto ya existe
          let products = [];

          for (let product of cart._products) {
            //el producto ya existe, se tiene que sumar la cantidad pero no esta esa variable todavia
            if (product._id == newProduct.id) {
              console.log("El producto a agregar ya existe");
              found = true;
            }
            products.push(product);
          }
          if (!found) products.push(newProduct);
          cart._products = products;
        }
        carts.push(cart);
      }
    }
    info = JSON.stringify(carts, null, "\t");
    await fs.promises.writeFile(fileName, info);
    if (!found) return "El producto se agrego correctamente";
    else return "El producto ya existia en el carrito";
  } catch (err) {
    console.log("Archivo vacio");
  }
}

export {
  getCarts,
  newCart,
  getCartById,
  deleteCartByID,
  deleteAllCarts,
  deleteCartProductById,
  getCartProductsById,
  addCartProductById,
};
