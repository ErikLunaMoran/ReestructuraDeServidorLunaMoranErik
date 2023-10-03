import { Router } from "express";
import { uploader } from "../middlewares/multer.js";
import ProductsManager from "../dao/db/ProductsManager.js";

const router = Router();
const autosManager = new ProductsManager();

router.post("/", uploader.single("file"), async (req, res) => {
  const { name, brand, year } = req.body;
  const image = req.file.originalname;
  const product = await autosManager.create(name, brand, year, image);
  /* console.log(req.file); */
  res.status(200).send(product);
});

export default router;
