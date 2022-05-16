import express from "express";
import 'dotenv/config'
import { uuid } from "uuidv4";
import { router as mainRouter } from "./routes/routes";
// import { newTestProducts } from "./utils/test/test";
import { DBService } from "./models/MariaDB/MariaDB";
import { DBService as DBSQLite } from "./models/SQLite3/SQLite3.databases";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { initMongoDB } from "./services/mongo.database";
import setWebSocket from "./services/server";
import path from "path";
import { ProductsModel } from "./models/schemas/products";

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



// DBService.init()
DBSQLite.init()

app.use("/api/", mainRouter);
setWebSocket(server)

const init = async () => {
  await initMongoDB();
  const puerto = process.env.PORT || 8080;

  server.listen(puerto, () => console.log(`SERVER UP ON PORT ${puerto}`));
};

init();
