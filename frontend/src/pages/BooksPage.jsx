import React from 'react';
import './styles.css';

const BooksPage = () => {
  // Temporary static data for display (replace with API call later)
  const books = [
    { id: 1, title: 'The Alchemist', author: 'Paulo Coelho', price: '$12.99' },
    { id: 2, title: 'Atomic Habits', author: 'James Clear', price: '$15.00' },
  ];

  return (
    <div className="books-page">
      <h2>Available Books</h2>
      <ul className="book-list">
        {books.map(book => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Price:</strong> {book.price}</p>
            <button>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksPage;
