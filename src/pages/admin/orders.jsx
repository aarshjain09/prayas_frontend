import { useEffect, useState } from "react";
import API from "../../services/api";
import Adminnav from "../../components/adminnav";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders/admin").then(res => setOrders(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/orders/${id}/status`, { status });
    setOrders(prev =>
      prev.map(o =>
        o._id === id ? { ...o, status } : o
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Adminnav />
      <h1 className="text-xl font-bold mb-4">Admin Orders</h1>

      <div className="bg-white border rounded-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="border-t px-3 py-2">Shop</th>
              <th className="border-t px-3 py-2">Address</th>
              <th className="border-t px-3 py-2">Phone</th>
              <th className="border-t px-3 py-2">Order Items</th>
              <th className="border-t px-3 py-2">Total</th>
              <th className="border-t px-3 py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(o => (
              <tr key={o._id}>
                {/* SHOP */}
                <td className="border-t px-3 py-2">
                  {o.user?.shopName || "Unknown"}
                </td>

                {/* ADDRESS */}
                <td className="border-t px-3 py-2 text-sm text-gray-600">
                  {o.user?.address || "No address"}
                </td>

                {/* PHONE */}
                <td className="border-t px-3 py-2 text-sm text-gray-600">
                  {o.user?.phone || "No phone"}
                </td>

                {/* ORDER ITEMS */}
                <td className="border-t px-3 py-2 text-sm">
                  {(o.items || []).length === 0 && (
                    <span className="text-gray-400">
                      No items
                    </span>
                  )}

                  {(o.items || []).map(item => (
                    <div
                      key={item._id}
                      className="mb-2"
                    >
                      <strong>
                        {item.product?.name || "Unknown product"}
                      </strong>
                      <div>
                        {item.boxes || 0} boxes,{" "}
                        {item.pieces || 0} pcs
                      </div>
                    </div>
                  ))}
                </td>

                {/* TOTAL */}
                <td className="border-t px-3 py-2 font-medium">
                  ₹{o.totalAmount}
                </td>

                {/* STATUS */}
                <td className="border-t px-3 py-2">
                  <select
                    value={o.status}
                    onChange={e =>
                      updateStatus(o._id, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
