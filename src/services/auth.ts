import passport from 'passport'
import { UserModel } from '../models/schemas/user'
import { Strategy as LocalStrategy } from 'passport-local';
import {IStrategyOptions} from 'passport-local'
import { Callback } from 'mongoose'

const strategyOptions= {
  usernameField: 'usuario',
  passwordField: 'contrasena',
  passReqToCallback: true,

};

const login = async (req: Request, username: string, password: string, done: Callback) => {
  console.log("Logueado")
  const user = await UserModel.find ({username, password})
  if (!user)
    return done( null, {mensaje: 'Usuario no encontrado'})
}

const signup = async ( username: string, password: string, done: Callback) => {
  console.log('SIGNUP!!');
  try {
    const newUser = await UserModel.create({ username, password });
    return done(null, newUser);
  } catch (err) {
    console.log('Hubo un error!');
    console.log(err);
    return done(null, { mensaje: 'Error Inesperado', err });
  }
};

export const loginFunc = new LocalStrategy(strategyOptions, login)
export const signUpFunc = new LocalStrategy(strategyOptions, signup)