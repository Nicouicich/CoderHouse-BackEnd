import express from "express";
import 'dotenv/config'
import { router as mainRouter } from "./routes/routes";
import { DBService as DBSQLite } from "./models/SQLite3/SQLite3.databases";
import { initMongoDB } from "./services/mongo.database";
import setWebSocket from "./services/server";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import { StoreOptions } from "./services/storeOptions";

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

// app.get('/' , (req,res) => {
//   res.render('index', { })
// })


// DBService.init()
DBSQLite.init()


app.use(cookieParser())
app.use(session(StoreOptions))
app.use("/api/", mainRouter);
setWebSocket(server)

const init = async () => {
  await initMongoDB();
  const puerto = process.env.PORT || 8080;

  server.listen(puerto, () => console.log(`SERVER UP ON PORT ${puerto}`));
};

init();
