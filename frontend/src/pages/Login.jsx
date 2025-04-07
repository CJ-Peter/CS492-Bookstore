import React from 'react';

const Login = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="email">Email:</label><br />
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label><br />
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
