const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    event.preventDefault();

    const productId = button.getAttribute("data-product-id");

    try {
      const response = await fetch(
        `/api/carts/${cartId}/product/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: 1 }), //
        }
      );

      if (response.status === 201) {
        alert("Producto agregado al carrito");
      } else {
        alert("Error al agregar el producto al carrito");
      }
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
    }
  });
});
