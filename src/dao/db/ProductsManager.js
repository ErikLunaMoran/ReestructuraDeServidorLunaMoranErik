import { autoModel } from "../models/product.model.js";

class ProductsManager {
  async create(name, brand, year, image) {
    const product = await autoModel.create({
      name,
      brand,
      year,
      image,
    });

    return product;
  }

  async getAll() {
    const products = await autoModel.find().lean();
    return products;
  }
}

export default ProductsManager;
