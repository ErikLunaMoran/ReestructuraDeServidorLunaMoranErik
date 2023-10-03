import { Router } from "express";
import ProductsManager from "../dao/db/ProductsManager.js";

const router = Router();
const autosManager = new ProductsManager();

router.get("/verProducts", async (req, res) => {
  const products = await autosManager.getAll();
  console.log(products);
  res.render("products", { products });
});

//endpoint del chat
router.get("/chat", (req, res) => res.render("chat", {}));

export default router;
