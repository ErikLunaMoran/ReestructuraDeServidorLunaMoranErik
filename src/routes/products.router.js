import { Router } from "express";
import { uploader } from "../middlewares/multer.js";
import ProductsManager from "../dao/db/ProductsManager.js";

const router = Router();
const productsManager = new ProductsManager();

router.post("/", uploader.single("file"), async (req, res) => {
  const { title, description, code, price, stock, category } = req.body;
  const image = req.file.originalname;
  const product = await productsManager.create(
    title,
    description,
    code,
    price,
    stock,
    category,
    image
  );
  /* console.log(req.file); */
  res.status(200).send(product);
});

export default router;

/* title, description, code, price, stock, category, image */
