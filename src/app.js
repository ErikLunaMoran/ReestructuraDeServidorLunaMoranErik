//Dependencias
import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

//Routes
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cartsRouter.js";
//Managers
/* import ProductManager from "./manager/ProductManager.js"; */
import CartManager from "./dao/db/CartsManager.js";
//Models
import { mensajeModel } from "./dao/models/messages.model.js";

//conexion a la base de datos ecommerce
mongoose.connect(
  "mongodb+srv://lunamoranerik:dPD7hggiuqpQOBkR@cluster0.svnnjjy.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=AtlasApp"
);

const app = express();
//guardar instancia de servidor en una variable
const httpServer = app.listen(8080, () => console.log("encendido"));
const socketServer = new Server(httpServer);

const cartManager = new CartManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Handelbars
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use("/static", express.static("./public")); //servidor capaz de entregar archivos estaticos
app.use(viewsRouter);
app.use("/products", productsRouter);

socketServer.on("connection", (socket) => {
  console.log("Se conectó", socket.id);
  socket.on("mensaje", async (data) => {
    await mensajeModel.create(data);
    const mensajes = await mensajeModel.find().lean();
    console.log(mensajes);
    socketServer.emit("nuevo_mensaje", mensajes);
  });
});

app.use("/api/carts", cartsRouter(cartManager));
