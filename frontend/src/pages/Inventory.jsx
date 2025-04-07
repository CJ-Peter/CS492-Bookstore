import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthProvider";
import "../styles/Inventory.css";

const Inventory = () => {
  const [books, setBooks] = useState([]);
  const [isStaff, setIsStaff] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  // Fetch books from the API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/books")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch books: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Books:", data.results); // Log the results array
        setBooks(data.results); // Set only the results array to books
      })
      .catch((err) => {
        console.error("Error fetching books:", err.message);
        setError(err.message);
      });
  }, []);

  // Verify if the user is a staff member
  useEffect(() => {
    if (user && user.is_staff) {
      setIsStaff(user.is_staff);
    }
  }, [user]);

  // Handle book deletion
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;

    try {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Handle book editing
  const handleEdit = (id) => {
    navigate(`/edit-book/${id}`);
  };

  return (
    <div className="inventory-container">
      <h2>Inventory Dashboard</h2>
      {error ? (
        <div>Error: {error}</div>
      ) : books.length > 0 ? (
        <div className="inventory-table-container">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Subject</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.subject}</td>
                  <td>{book.quantity}</td>
                  <td>${book.price}</td>
                  <td>
                    {isStaff && (
                      <>
                        <button onClick={() => handleEdit(book.id)}>Edit</button>
                        <button
                          onClick={() => handleDelete(book.id)}
                          style={{ marginLeft: "10px", color: "red" }}
                        >
                          Delete
                        </button>
                      </>
                    )}
                    <button onClick={() => addToCart(book)} style={{ marginLeft: "10px" }}>
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
};

export default Inventory;
