//ESTA BIEN ESTO????????????????????????????

import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  /* correo: {
    type: String,
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
  }, */
});

const cartModel = mongoose.model(cartCollection, cartSchema);
export { cartModel };
