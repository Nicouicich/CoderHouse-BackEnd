import mongoose from 'mongoose';
import { IDtoProduct } from './products';

export const cartCollectionName = 'carts';

export interface ICart {
  products: IDtoProduct[]
}

const cartSchema = new mongoose.Schema<ICart>({
	products: []
},
{versionKey:false});

export const CartModel = mongoose.model<ICart>(cartCollectionName, cartSchema);
