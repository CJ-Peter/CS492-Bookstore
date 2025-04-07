import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditBook.css";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    subject: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/books/${id}/`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Failed to load book:", err));
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://127.0.0.1:8000/api/books/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((res) => {
        if (res.ok) {
          alert("Book updated successfully!");
          navigate("/inventory");
        } else {
          alert("Failed to update the book.");
        }
      })
      .catch((err) => console.error("Error updating book:", err));
  };

  return (
    <div className="edit-book-container">
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit} className="edit-book-form">
        {["title", "author", "isbn", "subject", "price", "quantity"].map((field) => (
          <div key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type={field === "price" || field === "quantity" ? "number" : "text"}
              name={field}
              value={book[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
