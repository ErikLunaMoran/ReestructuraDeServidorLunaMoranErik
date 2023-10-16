import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = new mongoose.Schema({
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
    index: true,
    required: true,
  },
  stock: {
    type: Number,
    index: true,
    required: true,
  },
  category: {
    type: String,
    index: true,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  /* courses: {
    type: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "courses",
        },
      },
    ],
    default: [],
  }, */
});

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, productSchema);
export { productModel };
