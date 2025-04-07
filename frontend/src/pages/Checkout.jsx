import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import "../styles/Checkout.css";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!orderDetails.name || !orderDetails.email || !orderDetails.address) {
      alert("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);

    // Proceed with order submission (implement API call here)
    fetch("http://127.0.0.1:8000/api/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        customer: orderDetails,
        items: cartItems,
        status: "pending",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Order placed successfully:", data);
        alert("Order placed successfully!");
        clearCart(); // Clear cart after placing the order
      })
      .catch((err) => {
        console.error("Error placing order:", err);
        alert("Failed to place order. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Please add items to your cart before proceeding.</p>
      ) : (
        <div>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={orderDetails.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={orderDetails.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <textarea
                name="address"
                value={orderDetails.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="checkout-summary">
              <h3>Order Summary:</h3>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price}</td>
                      <td>${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="checkout-actions">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Checkout;
