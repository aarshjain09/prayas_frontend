import { useEffect, useState } from "react";
import API from "../../services/api";
import Adminnav from "../../components/adminnav";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    pricePerPiece: "",
    piecesPerBox: "",
    stockBoxes: "",
    stockPieces: ""
  });
  const [image, setImage] = useState(null);

  const loadProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ✅ ADD PRODUCT (INITIAL STOCK)
  const addProduct = async () => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("pricePerPiece", Number(form.pricePerPiece));
    formData.append("piecesPerBox", Number(form.piecesPerBox));
    formData.append("stockBoxes", Number(form.stockBoxes || 0));
    formData.append("stockPieces", Number(form.stockPieces || 0));
    if (image) formData.append("image", image);

    await API.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    setForm({
      name: "",
      pricePerPiece: "",
      piecesPerBox: "",
      stockBoxes: "",
      stockPieces: ""
    });
    setImage(null);
    loadProducts();
  };

  // ✅ UPDATE PRICE / PCS PER BOX ONLY
  const updateProduct = async (id, data) => {
    await API.put(`/products/${id}`, data);
    loadProducts();
  };

  // ✅ ADD NEW STOCK (CORRECT WAY)
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
          placeholder="Name"
          className="border p-2"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="₹ / piece"
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

                {/* PRICE */}
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

                {/* PCS / BOX */}
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

                {/* ✅ EDITABLE STOCK (ADD STOCK) */}
                <td className="border-t px-3 py-2 text-sm">
                  <div className="mb-1">
                    <strong>{p.stockBoxes}</strong> boxes
                    <br />
                    <strong>{p.stockPieces}</strong> pcs
                  </div>

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
