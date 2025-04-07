import React from "react";
import Footer from "../components/Footer";
import "../styles/index.css";

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to Bookstore Management</h1>
      <p>
        Manage your bookstore inventory, track sales, and provide a seamless shopping experience for your customers.
      </p>
      <p>
        Use the navigation above to explore the inventory, manage your cart, or view your profile.
      </p>
      <Footer />
    </div>
  );
};

export default Home;