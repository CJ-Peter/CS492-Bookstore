import React from "react";
import "../styles/Terms.css"; // Optional if you want to style it

const Terms = () => {
  return (
    <div className="terms-container">
      <h2>Terms and Conditions</h2>
      <p>
        Welcome to our bookstore application. By using our service, you agree to the following terms...
      </p>
      <ul>
        <li>All purchases are final.</li>
        <li>Prices and availability may change without notice.</li>
        <li>Personal data will be handled according to our privacy policy.</li>
      </ul>
      <p>Contact us for more information or concerns.</p>
    </div>
  );
};

export default Terms;