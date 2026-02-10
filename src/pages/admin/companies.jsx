import { useEffect, useState } from "react";
import API from "../../services/api";
import Adminnav from "../../components/adminnav";

export default function AdminCompanies() {
  const [companies, setCompanies] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================================
     LOAD COMPANIES
  ================================ */
  const loadCompanies = async () => {
    const res = await API.get("/companies");
    setCompanies(res.data);
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  /* ================================
     CLOUDINARY UPLOAD
  ================================ */
  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "company"); // 
    data.append("cloud_name", "dmtzonlbz"); // 

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dmtzonlbz/image/upload",
      {
        method: "POST",
        body: data
      }
    );

    const json = await res.json();
    return json.secure_url;
  };

  /* ================================
     ADD COMPANY
  ================================ */
  const addCompany = async () => {
    if (!name || !image) {
      alert("Company name and image are required");
      return;
    }

    try {
      setLoading(true);

      const imageUrl = await uploadToCloudinary(image);

      await API.post("/companies", {
        name,
        image: imageUrl
      });

      setName("");
      setImage(null);

      loadCompanies();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Adminnav />

      <h1 className="text-xl font-bold mb-4">Manage Companies</h1>

      {/* ADD COMPANY */}
      <div className="bg-white border rounded-md p-4 mb-6 grid md:grid-cols-3 gap-3">
        <input
          placeholder="Company Name"
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="border p-2"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          onClick={addCompany}
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Add Company"}
        </button>
      </div>

      {/* COMPANY LIST */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {companies.map((c) => (
          <div
            key={c._id}
            className="border rounded p-3 flex flex-col items-center"
          >
            <img
              src={c.image}
              alt={c.name}
              className="h-24 w-full object-contain mb-2"
            />
            <p className="font-semibold text-center">{c.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
