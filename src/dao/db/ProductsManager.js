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

  async getProductById(pid) {
    const product = await productModel.findById(pid).lean();
    return product;
  }
}

export default ProductsManager;
