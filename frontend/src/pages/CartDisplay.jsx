import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const CartDisplay = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h3>Cart</h3>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.title} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartDisplay;