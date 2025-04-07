import React from 'react';
import "../styles/Home.css"; 
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <header>
        <h1>Welcome to the Bookstore</h1>
        <nav>
          <ul>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="intro">
          <h2>Explore our wide selection of books</h2>
          <p>Find your next great read from our collection!</p>
        </section>
      </main>
      <footer>
        <p>&copy; 2025 Bookstore Management System</p>
      </footer>
    </div>
  );
};

export default HomePage;
