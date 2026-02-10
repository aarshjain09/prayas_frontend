import { useEffect, useState } from "react";
import API from "../../services/api";
import Adminnav from "../../components/adminnav";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    name: "",
    company: "",
    actualPricePerPiece: "",
    pricePerPiece: "",
    piecesPerBox: "",
    stockBoxes: "",
    stockPieces: ""
  });
  const [image, setImage] = useState(null);

  /* ================================
     LOAD PRODUCTS
  ================================ */
  const loadProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  /* ================================
     LOAD COMPANIES
  ================================ */
  const loadCompanies = async () => {
    const res = await API.get("/companies");
    setCompanies(res.data);
  };

  useEffect(() => {
    loadProducts();
    loadCompanies();
  }, []);

  /* ================================
     ADD PRODUCT
  ================================ */
  const addProduct = async () => {
    try {
      if (!form.company) {
        alert("Please select a company");
        return;
      }

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("company", form.company);
      formData.append("pricePerPiece", form.pricePerPiece);
      formData.append("piecesPerBox", form.piecesPerBox);
      formData.append("stockBoxes", form.stockBoxes || 0);
      formData.append("stockPieces", form.stockPieces || 0);

      // future-ready (backend will accept later)
      formData.append(
        "actualPricePerPiece",
        form.actualPricePerPiece
      );

      if (image) {
        formData.append("image", image);
      }

      await API.post("/products", formData);

      setForm({
        name: "",
        company: "",
        actualPricePerPiece: "",
        pricePerPiece: "",
        piecesPerBox: "",
        stockBoxes: "",
        stockPieces: ""
      });
      setImage(null);

      loadProducts();
    } catch (err) {
      console.error("Add product error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to add product");
    }
  };

  /* ================================
     UPDATE PRODUCT
  ================================ */
  const updateProduct = async (id, data) => {
    await API.put(`/products/${id}`, data);
    loadProducts();
  };

  /* ================================
     ADD STOCK
  ================================ */
  const addStock = async (id, data) => {
    await API.put(`/products/${id}/add-stock`, data);
    loadProducts();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Adminnav />

      <h1 className="text-xl font-bold mb-4">Manage Products</h1>

      {/* ADD PRODUCT */}
      <div className="bg-white border rounded-md p-4 mb-6 grid md:grid-cols-4 gap-3">

        <input
          placeholder="Product Name"
          className="border p-2"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        {/* COMPANY DROPDOWN */}
        <select
          className="border p-2"
          value={form.company}
          onChange={e =>
            setForm({ ...form, company: e.target.value })
          }
        >
          <option value="">Select Company</option>
          {companies.map(c => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* ACTUAL PRICE */}
        <input
          placeholder="Actual ₹ / piece"
          type="number"
          className="border p-2"
          value={form.actualPricePerPiece}
          onChange={e =>
            setForm({
              ...form,
              actualPricePerPiece: e.target.value
            })
          }
        />

        {/* SELLING PRICE */}
        <input
          placeholder="Selling ₹ / piece"
          type="number"
          className="border p-2"
          value={form.pricePerPiece}
          onChange={e =>
            setForm({ ...form, pricePerPiece: e.target.value })
          }
        />

        <input
          placeholder="Pieces / box"
          type="number"
          className="border p-2"
          value={form.piecesPerBox}
          onChange={e =>
            setForm({ ...form, piecesPerBox: e.target.value })
          }
        />

        <input
          placeholder="Initial Stock Boxes"
          type="number"
          className="border p-2"
          value={form.stockBoxes}
          onChange={e =>
            setForm({ ...form, stockBoxes: e.target.value })
          }
        />

        <input
          placeholder="Initial Stock Pieces"
          type="number"
          className="border p-2"
          value={form.stockPieces}
          onChange={e =>
            setForm({ ...form, stockPieces: e.target.value })
          }
        />

        <input
          type="file"
          accept="image/*"
          className="border p-2 md:col-span-4"
          onChange={e => setImage(e.target.files[0])}
        />

        <button
          onClick={addProduct}
          className="md:col-span-4 bg-green-600 text-white p-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* PRODUCT TABLE */}
      <div className="bg-white border rounded-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="border-t px-3 py-2">Name</th>
              <th className="border-t px-3 py-2">Company</th>
              <th className="border-t px-3 py-2">₹ / Piece</th>
              <th className="border-t px-3 py-2">Pcs / Box</th>
              <th className="border-t px-3 py-2">Box Price</th>
              <th className="border-t px-3 py-2">Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                <td className="border-t px-3 py-2">{p.name}</td>

                <td className="border-t px-3 py-2">
                  {p.company?.name}
                </td>

                <td className="border-t px-3 py-2">
                  <input
                    type="number"
                    defaultValue={p.pricePerPiece}
                    onBlur={e =>
                      updateProduct(p._id, {
                        pricePerPiece: Number(e.target.value)
                      })
                    }
                    className="border p-1 w-20"
                  />
                </td>

                <td className="border-t px-3 py-2">
                  <input
                    type="number"
                    defaultValue={p.piecesPerBox}
                    onBlur={e =>
                      updateProduct(p._id, {
                        piecesPerBox: Number(e.target.value)
                      })
                    }
                    className="border p-1 w-20"
                  />
                </td>

                <td className="border-t px-3 py-2">
                  ₹{p.boxPrice}
                </td>

                <td className="border-t px-3 py-2 text-sm">
                  <strong>{p.stockBoxes}</strong> boxes<br />
                  <strong>{p.stockPieces}</strong> pcs

                  <div className="flex gap-2 mt-1">
                    <input
                      type="number"
                      placeholder="+ boxes"
                      className="border p-1 w-20 text-sm"
                      onBlur={e =>
                        e.target.value &&
                        addStock(p._id, {
                          stockBoxes: Number(e.target.value)
                        })
                      }
                    />

                    <input
                      type="number"
                      placeholder="+ pcs"
                      className="border p-1 w-20 text-sm"
                      onBlur={e =>
                        e.target.value &&
                        addStock(p._id, {
                          stockPieces: Number(e.target.value)
                        })
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
