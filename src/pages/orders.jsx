import { useEffect, useState } from "react";
import API from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>

      {orders.map(o => (
        <div key={o._id} className="border p-4 mb-3 rounded">
          <p>Order ID: {o._id}</p>
          <p>Total: ₹{o.totalAmount}</p>
          <p>Status: <span className="font-semibold">{o.status}</span></p>
          <p>Date: {new Date(o.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
