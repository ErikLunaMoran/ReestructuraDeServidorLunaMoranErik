import { Router } from "express";
import ProductManager from "../manager/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./fileSystem/productos.json");

router.get("/", async (req, res) => {
  req.context.socketServer.emit();

  const products = await productManager.getProducts();
  res.render("realTimeProducts", { products });
});

export default router;
