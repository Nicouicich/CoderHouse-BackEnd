import {v4 as uuid } from "uuid";

class Product {
  private _id: string = uuid();
  private _timestamp: number = 0;
  private _nombre: string = "";
  private _descripcion: string = "";
  private _codigo: string = "";
  private _foto: string = "";
  private _stock: number = 0;
  private _precio: number = 0;

  

  constructor(
    timestamp: number,
    nombre: string,
    descripcion: string,
    foto: string,
    precio: number,
    stock: number
  ) {
    this._timestamp = Date.now()
    this._nombre = nombre
    this._descripcion=descripcion
    this._foto = foto
    this._precio = precio
    this._stock = stock

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
  public get nombre(): string {
    return this._nombre;
  }
  public set nombre(value: string) {
    this._nombre = value;
  }
  public get descripcion(): string {
    return this._descripcion;
  }
  public set descripcion(value: string) {
    this._descripcion = value;
  }
  public get codigo(): string {
    return this._codigo;
  }
  public set codigo(value: string) {
    this._codigo = value;
  }
  public get foto(): string {
    return this._foto;
  }
  public set foto(value: string) {
    this._foto = value;
  }
  
  public get precio(): number {
    return this._precio;
  }
  public set precio(value: number) {
    this._precio = value;
  }
  public get stock(): number {
    return this._stock;
  }
  public set stock(value: number) {
    this._stock = value;
  }


}
export {Product}