//ESTA BIEN ESTO?????????????????????????????-

import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: [
    {
      quantity: { type: Number },
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    },
  ],
});

const cartModel = mongoose.model(cartCollection, cartSchema);
export { cartModel };
