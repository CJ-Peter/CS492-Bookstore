import React, { useState } from 'react';
import '../styles/Register.css'; 

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="register-container">
      <h2>Create Your Account</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" required onChange={handleChange} />
        </label>

        <label>
          Email:
          <input type="email" name="email" required onChange={handleChange} />
        </label>

        <label>
          Password:
          <input type="password" name="password" required onChange={handleChange} />
        </label>

        <label>
          Confirm Password:
          <input type="password" name="confirmPassword" required onChange={handleChange} />
        </label>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
