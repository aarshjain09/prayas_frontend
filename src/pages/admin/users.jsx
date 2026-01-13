import { useEffect, useState } from "react";
import API from "../../services/api";
import Adminnav from "../../components/adminnav";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/users").then(res => setUsers(res.data));
  }, []);

  return (
    <div className="p-4">
      <Adminnav />
      <h1 className="text-xl font-bold mb-4">Registered Users</h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Shop Name</th>
              <th className="border p-2">Owner</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td className="border p-2">{u.shopName}</td>
                <td className="border p-2">{u.ownerName}</td>
                <td className="border p-2">{u.phone}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2 text-sm">{u.address}</td>
                <td className="border p-2">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
