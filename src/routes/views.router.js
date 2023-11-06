import { Router } from "express";
import ProductsManager from "../dao/db/ProductsManager.js";
import publicRoutes from "../middlewares/publicRoutes.js";
import privateRoutes from "../middlewares/privateRoutes.js";

const router = Router();
const productsManager = new ProductsManager();

router.get("/api/verProducts", async (req, res) => {
  const products = await productsManager.getAll();
  console.log(products);
  res.render("products", { products });
});

//endpoint del chat
router.get("/api/chat", (req, res) => res.render("chat", {}));

//Endpoint de Login con middlewar de public
router.get("/login", publicRoutes, (req, res) => {
  res.render("login");
});
//Endpoint de SingUp
router.get("/singup", publicRoutes, (req, res) => {
  res.render("singup");
});

router.get("/api/verProducts", privateRoutes, (req, res) => {
  const { first_name, last_name, email, age } = req.session;
  res.render("api/verProducts", { first_name, last_name, email, age });
});

//Endpoint de logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

//Endpoint de admin
router.get("/api/adminPage", privateRoutes, (req, res) => {
  const { first_name, last_name, email, age } = req.session;
  res.render("adminPage", { first_name, last_name, email, age });
});

export default router;

//Endpoint de Profile
/* router.get("/profile", privateRoutes, (req, res) => {
  const { first_name, last_name, email, age } = req.session;
  res.render("profile", { first_name, last_name, email, age });
}); */
