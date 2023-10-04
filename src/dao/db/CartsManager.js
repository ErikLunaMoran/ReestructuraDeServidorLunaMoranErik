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

  async getCartProducts(cid) {
    const cart = await cartModel.find({ _id: cid });
    return cart;
  }
}

/* async getCartProducts(cid) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id === cid);
      return cart ? cart.products : null;
    } catch (error) {
      throw error;
    }
  } */
