import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Inventory from "./pages/Inventory";
import BookEntry from "./pages/BookEntry";
import EditBook from "./pages/EditBook";
import Cart from "./pages/Cart"; // Updated Cart component
import Checkout from "./pages/Checkout";
import Reports from "./pages/Reports"; // New Reports page
import Homepage from "./pages/Homepage";
import Header from "./components/Header";
import AuthProvider, { AuthContext } from "./contexts/AuthProvider";
import CartProvider from "./contexts/CartProvider";

// PrivateRoute component to protect specific routes
const PrivateRoute = ({ children }) => {
  const { accessToken } = useContext(AuthContext);
  return accessToken ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route
              path="/book-entry"
              element={
                <PrivateRoute>
                  <BookEntry />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-book/:id"
              element={
                <PrivateRoute>
                  <EditBook />
                </PrivateRoute>
              }
            />
            <Route path="/cart" element={<Cart />} />
            
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/reports"
              element={
                <PrivateRoute roles={['admin']}>
                  <Reports />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
