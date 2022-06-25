import express from "express";
import 'dotenv/config'
import setWebSocket from "./services/server";
import path from "path";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import minimist from 'minimist'
import { router as mainRouter } from "./routes/routes";
import { initMongoDB } from "./services/mongo.database";
import { StoreOptions } from "./services/storeOptions";
import { loginFunc,signUpFunc } from "./services/auth";

const http = require("http");

const app = express();
const port: number = 8080;
const server = http.Server(app);
const publicFolderPath = path.resolve(__dirname, '../public')
const viewsFolderPath = path.resolve(__dirname, '../views/')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicFolderPath))
app.set('views', viewsFolderPath)
app.set('view engine', 'pug')
app.use(cookieParser())
app.use(session(StoreOptions))
app.use(passport.initialize());//Indicamos que vamos a usar passport en todas nuestras rutas
app.use(passport.session());//Permitimos que passport pueda manipular las sessiones de nuestra app
passport.use('login', loginFunc);// Cuando un usuario se autentique correctamente, passport va a devolver en la session la info del usuario
passport.use('signup', signUpFunc);//signUpFunc va a ser una funcion que vamos a crear y va a tener la logica de registro de nuevos usuarios
app.use("/api/", mainRouter);


setWebSocket(server)

const optionalArgsObject = {

  default: {
    port: '8080',
  },
};
const args = minimist(process.argv, optionalArgsObject);

const init = async () => {
  await initMongoDB();
  const puerto = args.port;

  server.listen(puerto, () => console.log(`SERVER UP ON PORT ${puerto}`));
};

init();
