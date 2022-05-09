import { Product } from "./Product";
import { Express, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { DBService } from "../../models/MariaDB/MariaDB";

// const fileName: string = path.resolve(__dirname, "products.txt");
// async function getProducts() {
//   try {
//     const data: string = await fs.promises.readFile(fileName, "utf-8");
//     return JSON.parse(data);
//   } catch (err) {
//     console.log("Archivo vacio");
//   }
// }

// async function newProduct(product: Product) {
//   try {
//     let arr = [];
//     let data: string = await getProducts();
//     if (!data) arr = [product];
//     else {
//       for (let item of data) {
//         arr.push(item);
//       }
//       arr.push(product);
//     }
//     let info = JSON.stringify(arr, null, "\t");
//     await fs.promises.writeFile(fileName, info);
//     return `El producto se guardo correctamente producto se guardo correctamente con el ID: ${product.id}`;
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function deleteByID(id: string) {
//   try {
//     let arr = [];
//     let deletedID: boolean = false;
//     let data = await getProducts();
//     for (let item of data) {
//       // si le pasan un id para borrar directamente no lo escribo en el nuevo array y seteo deletedID en true
//       if (item._id != id) arr.push(item);
//       else deletedID = true;
//     }
//     const info = JSON.stringify(arr, null, "\t");
//     await fs.promises.writeFile(fileName, info);
//     if (deletedID) return `El producto con el ID ${id} fue eliminado con exito`;
//     else return "Producto inexistente";
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function upgradeById(id: string, product: Product) {
//   try {
//     let arr = [];
//     let upgraded: boolean = false;
//     let data = await getProducts();
//     for (let item of data) {
//       // si le pasan un id para borrar directamente no lo escribo en el nuevo array y seteo deletedID en true
//       if (item._id != id) arr.push(item);
//       else {
//         upgraded = true;
//         arr.push(product);
//       }
//     }
//     const info = JSON.stringify(arr, null, "\t");
//     await fs.promises.writeFile(fileName, info);
//     if (upgraded)
//       return `El producto con el ID ${id} fue actualizado con exito`;
//     else return "Producto inexistente";
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function getProductById(id: string) {
//   try {
//     const data: string = await fs.promises.readFile(fileName, "utf-8");
//     const info = JSON.parse(data);
//     let found = false;
//     for (let item of info) {
//       // si le pasan un id para borrar directamente no lo escribo en el nuevo array y seteo deletedID en true
//       if (item._id == id) return item;
//     }
//     return "Producto no encontrado";
//   } catch (err) {
//     console.log("Archivo vacio");
//   }
// }

// async function deleteAllProducts() {
//   await fs.promises.writeFile(fileName, "");
// }
// export {
//   getProducts,
//   newProduct,
//   deleteByID,
//   upgradeById,
//   deleteAllProducts,
//   getProductById,
// };

const tableName = 'productos';

export const getProducts = async (req:Request, res:Response) => {
  try {
    const items = await DBService.get(tableName,"");

    res.json({
      data: items,
    });
  } catch (err) {
    res.status(500).json({
      // Tengo q preguntar como manejar el error
      // error: err.message,
      // stack: err.stack,
    });
  }
};

export const getProductById = async (req:Request, res:Response) => {
  try {
    const { id } = req.params;

    const item = await DBService.get(tableName, id);

    if (!item.length)
      return res.status(404).json({
        msgs: 'Product not found!',
      });

    res.json({
      data: item,
    });
  } catch (err) {
    res.status(500).json({
      // error: err.message,
      // stack: err.stack,
    });
  }
};

export const newProduct = async (req:Request, res:Response) => {
  try {
    const { nombre, descripcion, stock, precio } = req.body;

    const data = {
      nombre,
      descripcion,
      stock,
      precio,
    
    };

    const newId = await DBService.create(tableName, data);

    const newProduct = await DBService.get(tableName, newId);

    res.json({
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      // error: err.message,
      // stack: err.stack,
    });
  }
};

export const upgradeById = async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, stock, precio, category_id } = req.body;

    let item = await DBService.get(tableName, id);

    if (!item.length)
      return res.status(404).json({
        msgs: 'Product not found!',
      });

    const data = {
      nombre,
      descripcion,
      stock,
      precio,
      category_id,
    };

    DBService.update(tableName, id, data);

    item = await DBService.get(tableName, id);
    res.json({
      msg: 'Product updated',
      item,
    });
  } catch (err) {
    res.status(500).json({
      // error: err.message,
      // stack: err.stack,
    });
  }
};


export const deleteByID = async (req:Request, res:Response) => {
  try {
    const { id } = req.params;

    DBService.delete(tableName, id);
    res.json({
      msg: 'product deleted',
    });
  } catch (err) {
    res.status(500).json({
      // error: err.message,
      // stack: err.stack,
    });
  }
};