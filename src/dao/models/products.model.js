import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
  /* title,
      description,
      code,
      price,
      stock,
      category,
      image, */
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const productModel = mongoose.model(productCollection, productSchema);
export { productModel };
