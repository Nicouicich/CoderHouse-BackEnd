import { NextFunction, Request, Response } from 'express';
import { CategoryModel } from '../models/schemas/categories';

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await CategoryModel.find();

    res.json({
      data: items,
    });
  } catch (err) {
    if(err instanceof Error)
      res.status(500).json({
        error: err.message,
        stack: err.stack,
      });
    else next(err);
  }
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log(id)
    const item = await CategoryModel.findById(id);

    if (!item)
      return res.status(404).json({
        msgs: 'Category not found!',
      });

    res.json({
      data: item,
    });
  } catch (err) {
    if(err instanceof Error)
      res.status(500).json({
        error: err.message,
        stack: err.stack,
      });
    else next(err);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion)
      return res.status(400).json({
        msg: 'Invalid Body',
      });

    const newCategory = await CategoryModel.create({
      nombre,
      descripcion,
    });

    res.json({
      data: newCategory,
    });
  } catch (err) {
    if(err instanceof Error)
      res.status(500).json({
        error: err.message,
        stack: err.stack,
      });
    else next(err);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion)
      return res.status(400).json({
        msg: 'Invalid Body',
      });

    const categoryUpdated = await CategoryModel.findByIdAndUpdate(
      id,
      { nombre, descripcion },
      { new: true }
    );

    res.json({
      msg: 'Category updated',
      category: categoryUpdated,
    });
  } catch (err) {
    if(err instanceof Error)
      res.status(500).json({
        error: err.message,
        stack: err.stack,
      });
    else next(err);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await CategoryModel.findByIdAndDelete(id);

    res.json({
      msg: 'Category deleted',
    });
  } catch (err) {
    if(err instanceof Error)
      res.status(500).json({
        error: err.message,
        stack: err.stack,
      });
    else next(err);
  }
};


export const getCategoryIdBynombre = async (nombre: string) => {
  try {

    const id = await CategoryModel.find({nombre: nombre});
    if (!id)
      return null
    return id[0]._id

  } catch (err) {
    return ("Error while requesting the ID to the categories database")
      
  }
};