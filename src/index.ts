import express from "express";
import { uuid } from "uuidv4";
import { router as mainRouter } from "./routes/routes";
import { newTestProducts } from "./utils/test/test";
const http = require("http");

const app = express();
const port: number = 8080;
const server = http.Server(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server.listen(port, () => console.log("Server Up en el puerto ", port));
app.use("/api/", mainRouter);
//newTestProducts() //Unicamente lo corro para generar un par de archivos. Descomentar para generar una muestra
