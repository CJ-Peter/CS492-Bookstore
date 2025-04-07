import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { CartContext } from "../contexts/CartContext";
import "../styles/Header.css";

const Header = () => {
  const { accessToken, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <header style={{ padding: "1rem", background: "#eee" }}>
      <nav>
        <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
        {!accessToken ? (
          <>
            <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
            <Link to="/register" style={{ marginRight: "1rem" }}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/profile" style={{ marginRight: "1rem" }}>Profile</Link>
            <button onClick={logout} style={{ marginRight: "1rem" }}>Logout</button>
          </>
        )}
        <Link to="/cart" style={{ marginRight: "1rem" }}>
          Cart ({cart.length})
        </Link>
        <Link to="/inventory">Inventory</Link>
      </nav>
    </header>
  );
};

export default Header;
