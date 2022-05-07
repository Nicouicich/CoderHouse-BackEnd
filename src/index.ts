import express from "express";
import { uuid } from "uuidv4";
import { router as mainRouter } from "./routes/routes";
// import { newTestProducts } from "./utils/test/test";
import { DBService } from "../models/MariaDB/MariaDB";
import { DBService as DBSQLite } from "../models/SQLite3/SQLite3.databases";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import setWebSocket from "./services/server";
import path from "path";

const http = require("http");

const app = express();
const port: number = 8080;
const server = http.Server(app);
const publicFolderPath = path.resolve(__dirname, '../public')
const viewsFolderPath = path.resolve(__dirname, '../public/views/')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicFolderPath))
app.set('views', viewsFolderPath)
app.set('view engine', 'pug')



DBService.init()
DBSQLite.init()

server.listen(port, () => console.log("Server Up en el puerto ", port));
app.use("/api/", mainRouter);
setWebSocket(server)
//newTestProducts() //Unicamente lo corro para generar un par de archivos. Descomentar para generar una muestra

