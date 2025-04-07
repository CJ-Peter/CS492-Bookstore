// src/services/apiService.jsx

export const fetchBooks = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/books/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
  
    return response.json();
  };
  
  export const fetchVerifyToken = async (token) => {
    const response = await fetch('http://127.0.0.1:8000/api/token/verify/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
  
    if (!response.ok) {
      throw new Error('Token verification failed');
    }
  
    return response.json();
  };
  
  export const fetchDeleteBook = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/books/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
  
    return response.json();
  };
  