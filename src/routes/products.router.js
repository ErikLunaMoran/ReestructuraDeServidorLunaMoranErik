import { Router } from "express";
import { uploader } from "../middlewares/multer.js";
import ProductsManager from "../dao/db/ProductsManager.js";
import { productModel } from "../dao/models/products.model.js";

const router = Router();
const productsManager = new ProductsManager();

// Ruta para obtener los productos
router.get("/", async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;

    const sortObjectMapper = {
      asc: { price: 1 },
      desc: { price: -1 },
    };

    const modelQuery = query ? JSON.parse(query) : {};
    const modelLimit = limit ? parseInt(limit, 10) : 10;
    const modelPage = page ? parseInt(page, 10) : 1;
    const modelSort = sortObjectMapper[sort] ?? undefined;

    const products = await productModel.paginate(modelQuery, {
      limit: modelLimit,
      page: modelPage,
      sort: modelSort,
    });

    const response = {
      status: "success",
      payload: products.docs,
      totalDocs: products.totalDocs,
      limit: products.limit,
      totalPages: products.totalPages,
      page: products.page,
      pagingCounter: products.pagingCounter,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
    };

    res.send(response);
    /* res.render("cardProducts", { cardProducts: products.docs }); */
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en la solicitud");
  }
});

// Ruta para obtener un producto por su ID (pid)
router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;

  try {
    const product = await productsManager.getProductById(pid);

    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).send("Error al obtener el producto");
  }
});

// Ruta para crear un nuevo producto
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
