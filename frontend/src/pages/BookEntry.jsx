import React, { useState } from "react";
import "../styles/BookEntry.css";

const BookEntry = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    subject: "",
    quantity: "",
    price: ""
  });

  const fieldOrder = ["title", "author", "isbn", "subject", "quantity", "price"];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/books/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add book");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Book added:", data);
        alert("Book added!");
        setFormData({
          title: "",
          author: "",
          isbn: "",
          subject: "",
          quantity: "",
          price: ""
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Something went wrong");
      });
  };

  return (
    <div className="book-entry-container">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit} className="book-entry-form">
        {fieldOrder.map((field) => (
          <div key={field} className="form-group">
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === "price" || field === "quantity" ? "number" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default BookEntry;
