import React, { useEffect, useState } from "react";

const LowStockAlert = () => {
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/low-stock")
      .then((response) => response.json())
      .then((data) => setLowStockItems(data))
      .catch((error) => console.error("Error fetching low-stock items:", error));
  }, []);

  return (
    <div>
      {lowStockItems.length > 0 && (
        <div style={{ color: "red" }}>
          <h4>Low Stock Alerts:</h4>
          <ul>
            {lowStockItems.map((item) => (
              <li key={item.id}>{item.name} - {item.stock} left</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LowStockAlert;