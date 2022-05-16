import mongoose from 'mongoose';
import { Document } from 'mongoose';
export const categoryCollectionName = 'categorie';

export interface ICategory {
  nombre: string;
  descripcion: string;
}

const categorySchema = new mongoose.Schema<ICategory>({
	nombre: {type: String, required: true, unique:true},
	descripcion : {type: String, required: true},
},
{versionKey:false});

export const CategoryModel = mongoose.model<ICategory>(categoryCollectionName, categorySchema);