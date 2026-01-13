import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { CartContext } from "../context/cart";
import QuantitySelector from "../components/quantityselector";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, updateQty } = useContext(CartContext);

  useEffect(() => {
    API.get("/products").then(res => setProducts(res.data));
  }, []);

  // Helper to get cart item for a product
  const getCartItem = (productId) =>
    cart.find(c => c.product._id === productId);

  return (
    <div className=" max-w-7xl mx-auto px-4 py-6
  grid grid-cols-2
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-3
  gap-6">
      {products.map(p => {
        const cartItem = getCartItem(p._id);
        const pieces = cartItem?.pieces || 0;
        const boxes = cartItem?.boxes || 0;

        return (
          <div key={p._id} className="bg-white border rounded-md
  p-4 flex flex-col">
            {/* IMAGE */}
            {p.image && (
              <img
                src={p.image} alt={p.name}
                className="w-full h-40 object-cover mb-3 rounded"
              />
            )}

            <h2 className="font-bold text-lg">{p.name}</h2>
            <p className="text-sm">₹{p.pricePerPiece} / piece</p>
            <p className="text-sm">{p.piecesPerBox} pcs / box</p>

            {/* PIECES */}
            <div className="flex justify-between items-center mt-3  text-sm">
              <span className="text-sm font-medium">Pieces</span>
              <QuantitySelector
                value={pieces}
                onChange={(v) =>
                  cartItem
                    ? updateQty(p._id, "pieces", v)
                    : addToCart(p, v, 0)
                }
              />
            </div>

            {/* BOXES */}
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium">Boxes</span>
              <QuantitySelector
                value={boxes}
                onChange={(v) =>
                  cartItem
                    ? updateQty(p._id, "boxes", v)
                    : addToCart(p, 0, v)
                }
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
