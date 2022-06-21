import passport from 'passport'
import { UserModel } from '../models/schemas/user'
import passportLocal from 'passport-local'
import { Request } from 'express'
import { IStrategyOptions } from 'passport-local'
import { Callback } from 'mongoose'

const LocalStrategy = passportLocal.Strategy

const strategyOptions: any = {
  usernameField: 'usuario',
  passwordField: 'contrasena',
  passReqToCallback: true
}


const login = async (req: Request, username: string, password: string, done: any) => {
  const user = await UserModel.find({ username, password })
   if (user) {
    console.log('Logueado')
    console.log(user)
    return done(null, user )
  } else {
    return done(null, false, {mensaje: 'Usuario no encontrado' })
  }
}

const signup = async (req:Request, username: string, password: string, done: any) => {
  console.log('SIGNUP!!')
  try {
    const newUser = await UserModel.create({ username, password })
    
    return done(null, newUser)
  } catch (err) {
    console.log('Hubo un error!')
    console.log(err)
    return done(null, { mensaje: 'Error Inesperado', err })
  }
}

passport.serializeUser((user, done) => {
  console.log('Se Ejecuta el serializeUser');
  done(null, user);
});

/**
 * DeserializeUser Permite tomar la info que mandamos con el serializeUser para hacer algun extra de busqueda de informacion
 */
 passport.deserializeUser((userId, done) => {
  console.log('Se Ejecuta el desserializeUser');
  UserModel.findById(userId).then((user) => {
    return done(null, user);
  })
});

export const loginFunc = new LocalStrategy(strategyOptions, login as any)
export const signUpFunc = new LocalStrategy(strategyOptions, signup as any)
