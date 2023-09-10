import express from "express";

import handlebars from "express-handlebars";
import { Server } from "socket.io";

import ProductManager from "./manager/ProductManager.js";
import CartManager from "./manager/CartManager.js";

import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";

import viewsRouter from "./routes/viewsRouter.js";

const app = express();
const productManager = new ProductManager();
const cartManager = new CartManager();
const httpServer = app.listen(8080, () => console.log("Servidor encendido"));
const socketServer = new Server(httpServer);

//HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");
app.use(express.static("./srcpublic"));

//nuevo midleWar
app.use((req, res, next) => {
  req.context = { socketServer };
  next();
});

//Para que nuestra API lea JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/realtimeproducts/", viewsRouter);

app.use("/api/products", productsRouter(productManager));
app.use("/api/carts", cartsRouter(cartManager));

/* app.listen(8080, () => console.log("Servidor encendido")); */
