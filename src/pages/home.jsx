import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const res = await API.get("/companies");
        setCompanies(res.data);
      } catch (err) {
        console.error("Failed to load companies", err);
      }
    };

    loadCompanies();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      {companies.map((company) => (
        <div
          key={company._id}
          onClick={() => navigate(`/company/${company._id}`)}
          className="border rounded-md p-4 cursor-pointer hover:shadow-md transition"
        >
          <img
            src={company.image}
            alt={company.name}
            className="h-24 w-full object-contain mb-3"
          />

          <p className="text-center font-semibold">
            {company.name}
          </p>
        </div>
      ))}
    </div>
  );
}
