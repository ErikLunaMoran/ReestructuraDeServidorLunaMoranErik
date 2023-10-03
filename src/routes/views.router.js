import { Router } from "express";
import ProductsManager from "../dao/db/ProductsManager.js";

const router = Router();
const productsManager = new ProductsManager();

router.get("/verProducts", async (req, res) => {
  const products = await productsManager.getAll();
  console.log(products);
  res.render("products", { products });
});

//endpoint del chat
router.get("/chat", (req, res) => res.render("chat", {}));

export default router;
