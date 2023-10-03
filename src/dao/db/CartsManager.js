import { cartModel } from "../models/carts.model.js";

export default class CartManager {
  async getAllCarts() {
    const carts = await cartModel.find().lean();
    return carts;
  }

  async addCart(cart) {
    const newCart = cartModel.create(cart);
    return newCart.id;
  }

  async getCartById(id) {
    const cart = await cartModel.find({ _id: id });
    return cart;
  }
}
