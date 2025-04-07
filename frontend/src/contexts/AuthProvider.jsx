import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(); // Ensure this is exported

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token'));
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (accessToken && isTokenExpired(accessToken)) {
      handleTokenRefresh();
    }
  }, [accessToken]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/books")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch books: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Books:", data); // Log the fetched data
        setBooks(data);
      })
      .catch((err) => {
        console.error("Error fetching books:", err.message);
        setError(err.message);
      });
  }, []);

  const isTokenExpired = (token) => {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = tokenPayload.exp * 1000;
    return Date.now() >= expirationTime;
  };

  const handleTokenRefresh = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('access_token', data.access);
      setAccessToken(data.access);
    } else {
      console.error('Failed to refresh token');
    }
  };

  const login = (access, refresh) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    setAccessToken(access);
    setRefreshToken(refresh);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAccessToken(null);
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, refreshToken: handleTokenRefresh, books, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
