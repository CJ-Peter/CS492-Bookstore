import React, { createContext, useState, useEffect } from "react";

import { CartContext } from "./CartContextDefinition";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book) => {
    setCart((prevCart) => {
      const existingBook = prevCart.find((item) => item.id === book.id);
      if (existingBook) {
        return prevCart.map((item) =>
          item.id === book.id
            ? { ...item, orderedQuantity: (item.orderedQuantity || 0) + 1 }
            : item
        );
      }
      return [...prevCart, { ...book, orderedQuantity: 1 }];
    });
  };

  const updateOrderedQuantity = (id, quantity) => {
    console.log(`Updating orderedQuantity for item ID ${id} to ${quantity}`);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, orderedQuantity: quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });

      if (!response.ok) {
        throw new Error("Failed to process checkout");
      }

      clearCart();
      alert("Checkout successful!");
    } catch (error) {
      console.error("Error during checkout:", error.message);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        handleCheckout,
        updateOrderedQuantity, // Ensure this is passed
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;