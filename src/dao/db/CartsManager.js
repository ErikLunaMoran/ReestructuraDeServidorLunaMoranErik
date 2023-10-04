import { cartModel } from "../models/carts.model.js";

export default class CartManager {
  async getAllCarts() {
    const carts = await cartModel.find().lean();
    return carts;
  }

  async createCart(cart) {
    const newCart = cartModel.create(cart);
    return newCart.id;
  }

  async getCartById(cid) {
    try {
      const cart = await cartModel.findById(cid);
      return cart;
    } catch (error) {
      throw error;
    }
  }
}
