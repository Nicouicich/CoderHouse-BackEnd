import { Product } from "./Product";
import fs from "fs";
import path from "path";

const fileName: string = path.resolve(__dirname, "products.txt");
async function getProducts() {
  try {
    const data: string = await fs.promises.readFile(fileName, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log("Archivo vacio");
  }
}

async function newProduct(product: Product) {
  try {
    let arr = [];
    let data: string = await getProducts();
    if (!data) arr = [product];
    else {
      for (let item of data) {
        arr.push(item);
      }
      arr.push(product);
    }
    let info = JSON.stringify(arr, null, "\t");
    await fs.promises.writeFile(fileName, info);
    return `El producto se guardo correctamente producto se guardo correctamente con el ID: ${product.id}`;
  } catch (err) {
    console.log(err);
  }
}

async function deleteByID(id: string) {
  try {
    let arr = [];
    let deletedID: boolean = false;
    let data = await getProducts();
    for (let item of data) {
      // si le pasan un id para borrar directamente no lo escribo en el nuevo array y seteo deletedID en true
      if (item._id != id) arr.push(item);
      else deletedID = true;
    }
    const info = JSON.stringify(arr, null, "\t");
    await fs.promises.writeFile(fileName, info);
    if (deletedID) return `El producto con el ID ${id} fue eliminado con exito`;
    else return "Producto inexistente";
  } catch (err) {
    console.log(err);
  }
}

async function upgradeById(id: string, product: Product) {
  try {
    let arr = [];
    let upgraded: boolean = false;
    let data = await getProducts();
    for (let item of data) {
      // si le pasan un id para borrar directamente no lo escribo en el nuevo array y seteo deletedID en true
      if (item._id != id) arr.push(item);
      else {
        upgraded = true;
        arr.push(product);
      }
    }
    const info = JSON.stringify(arr, null, "\t");
    await fs.promises.writeFile(fileName, info);
    if (upgraded)
      return `El producto con el ID ${id} fue actualizado con exito`;
    else return "Producto inexistente";
  } catch (err) {
    console.log(err);
  }
}

async function getProductById(id: string) {
  try {
    const data: string = await fs.promises.readFile(fileName, "utf-8");
    const info = JSON.parse(data);
    let found = false;
    for (let item of info) {
      // si le pasan un id para borrar directamente no lo escribo en el nuevo array y seteo deletedID en true
      if (item._id == id) return item;
    }
    return "Producto no encontrado";
  } catch (err) {
    console.log("Archivo vacio");
  }
}

async function deleteAllProducts() {
  await fs.promises.writeFile(fileName, "");
}
export {
  getProducts,
  newProduct,
  deleteByID,
  upgradeById,
  deleteAllProducts,
  getProductById,
};
