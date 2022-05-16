import mongoose, { ObjectId } from 'mongoose';
import { cartCollectionName } from './cart';
import { categoryCollectionName } from './categories';

export const productsCollectionName = 'products';

export interface IProduct {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoryId:mongoose.Schema.Types.ObjectId
}

export interface IDtoProduct extends IProduct {
  cantidad: number,
  id: string
}

const productsSchema = new mongoose.Schema<IProduct>({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: categoryCollectionName,
    required: true,
  },
  
},{versionKey:false});

export const ProductsModel = mongoose.model<IProduct>(
  productsCollectionName,
  productsSchema
);
