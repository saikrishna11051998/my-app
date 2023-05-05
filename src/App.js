
import "./App.css";
import React, { useState, useEffect } from "react";


function OrderTable() {
  const [orders, setOrders] = useState([
    { id: 1, itemName: "Data 1", orderStatus: "pending" },
    { id: 2, itemName: "Data 2", orderStatus: "pending" }
  ]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const handleStatusChange = (id, value) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === id) {
        return { ...order, orderStatus: value === 1 ? "delivered" : "pending" };
      } else {
        return order;
      }
    });
    setOrders(updatedOrders);
  };

  return (
    <table class ="center">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Item Name</th>
          <th>Order Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.itemName}</td>
            <td className={`status-${order.orderStatus}`}>
              <input
                type="range"
                min="0"
                max="1"
                value={order.orderStatus === "pending" ? 0 : 1}
                onChange={(e) => handleStatusChange(order.id, parseInt(e.target.value))}
              />
              <span>{order.orderStatus}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrderTable;