import { productModel } from "../models/products.model.js";

class ProductsManager {
  async create(title, description, code, price, stock, category, image) {
    const product = await productModel.create({
      title,
      description,
      code,
      price,
      stock,
      category,
      image,
    });

    return product;
  }

  async getAll() {
    const products = await productModel.find().lean();
    return products;
  }
}

export default ProductsManager;
