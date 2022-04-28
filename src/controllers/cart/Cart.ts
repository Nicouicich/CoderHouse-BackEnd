import {v4 as uuid } from "uuid";
import { Product } from "../products/Product";

class Cart {
  private _id: string = uuid();
  private _timestamp: number = 0;
  private _products :Product[]= []

  constructor(
    timestamp: number,
  ) {
    this._timestamp = Date.now()
  }


  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  public get timestamp(): number {
    return this._timestamp;
  }
  public set timestamp(value: number) {
    this._timestamp = value;
  }
  public get products (){
    return this._products
  }
  public newProduct (product: Product){
    this.products.push(product)
  }


}
export {Cart}