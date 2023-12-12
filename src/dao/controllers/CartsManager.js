import { cartModel } from "../models/carts.model.js";
import { productModel } from "../models/products.model.js";

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
      const cart = await cartModel.findById(cid).populate("products.product");
      console.log(JSON.stringify(cart, null, "\t"));
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cid, pid, quantity) {
    try {
      // Verifica si el carrito con el ID (cid) existe
      const cart = await cartModel.findById(cid);

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      // Verifica si el producto con el ID (pid) existe
      const product = await productModel.findById(pid);

      if (!product) {
        throw new Error("Producto no encontrado");
      }

      // Agrega el producto al carrito con la cantidad especificada
      cart.products.push({
        product: product._id,
        quantity: quantity,
      });

      // Actualiza el ID del carro con los productos añadidos
      const result = await cartModel.updateOne({ cid }, cart);

      // Guarda el carrito actualizado en la base de datos
      await cart.save();

      return cart; // Devuelve el carrito actualizado
    } catch (error) {
      throw error;
    }
  }

  //Elimina un producto producto específico de un carrito específico
  async removeProductFromCart(cid, pid) {
    try {
      // Busca el carrito por su ID (cid)
      const cart = await cartModel.findById(cid);

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      // Busca el índice del producto que deseas eliminar en el carrito
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === pid
      );

      if (productIndex === -1) {
        throw new Error("Producto no encontrado en el carrito");
      }

      // Elimina el producto del carrito usando el índice
      cart.products.splice(productIndex, 1);

      // Guarda el carrito actualizado en la base de datos
      await cart.save();

      return cart; // Devuelve el carrito actualizado
    } catch (error) {
      throw error;
    }
  }

  //Elimina todos los productos de un carrito específico
  async removeAllProductsFromCart(cid) {
    try {
      // Busca el carrito por su ID (cid)
      const cart = await cartModel.findById(cid);

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      // Elimina todos los productos del carrito
      cart.products = [];

      // Guarda el carrito actualizado en la base de datos
      await cart.save();

      return cart; // Devuelve el carrito actualizado
    } catch (error) {
      throw error;
    }
  }

  // Actualiza un carrito con un arreglo de productos
  async updateCart(cid, updatedProducts) {
    try {
      // Verifica si el carrito con el ID (cid) existe
      const cart = await cartModel.findById(cid);

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      // Actualiza los productos en el carrito con el nuevo arreglo
      cart.products = updatedProducts;

      // Guarda el carrito actualizado en la base de datos
      await cart.save();

      return cart; // Devuelve el carrito actualizado
    } catch (error) {
      throw error;
    }
  }

  // Actualiza la cantidad de ejemplares de un producto en un carrito
  async updateProductQuantity(cid, pid, quantity) {
    try {
      // Verifica si el carrito con el ID (cid) existe
      const cart = await cartModel.findById(cid);

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      // Busca el producto en el carrito por su ID (pid)
      const productInCart = cart.products.find(
        (item) => item.product.toString() === pid
      );

      if (!productInCart) {
        throw new Error("Producto no encontrado en el carrito");
      }

      // Actualiza la cantidad del producto
      productInCart.quantity = quantity;

      // Guarda el carrito actualizado en la base de datos
      await cart.save();

      return cart; // Devuelve el carrito actualizado
    } catch (error) {
      throw error;
    }
  }
}
