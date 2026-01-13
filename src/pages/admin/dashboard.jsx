import { useEffect, useState } from "react";
import API from "../../services/api";
import Adminnav from "../../components/adminnav"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    pending: 0,
    delivered: 0
  });

  useEffect(() => {
    const load = async () => {
      const products = await API.get("/products");
      const orders = await API.get("/orders/admin");

      setStats({
        products: products.data.length,
        orders: orders.data.length,
        pending: orders.data.filter(o => o.status === "pending").length,
        delivered: orders.data.filter(o => o.status === "delivered").length
      });
    };
    load();
  }, []);

  return (
    <div className="p-4">
        <Adminnav/>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Products" value={stats.products} />
        <StatCard title="Orders" value={stats.orders} />
        <StatCard title="Pending" value={stats.pending} />
        <StatCard title="Delivered" value={stats.delivered} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white shadow rounded p-4 text-center">
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
