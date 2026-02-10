import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { CartContext } from "../context/cart";
import QuantitySelector from "../components/quantityselector";

export default function CompanyProducts() {
  const { companyId } = useParams();
  const { cart, addToCart, updateQty } = useContext(CartContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!companyId) return;

    API.get(`/products/company/${companyId}`)
      .then(res => setProducts(res.data))
      .catch(err =>
        console.error(
          "Failed to load company products",
          err.response?.data || err.message
        )
      );
  }, [companyId]);

  const getCartItem = (productId) =>
    cart.find(c => c.product._id === productId);

  if (!products.length) {
    return (
      <div className="p-6 text-center text-gray-500">
        No products available for this company
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map(p => {console.log("PRICE CHECK", {
  name: p.name,
  actualPrice: p.actualPrice,
  sellingPrice: p.pricePerPiece
});

        const cartItem = getCartItem(p._id);
        const pieces = cartItem?.pieces || 0;
        const boxes = cartItem?.boxes || 0;

        const hasDiscount =
          p.actualPrice &&
          p.actualPrice > p.pricePerPiece;

        const discountPercent = hasDiscount
          ? Math.round(
              ((p.actualPrice - p.pricePerPiece) /
                p.actualPrice) *
                100
            )
          : 0;

        return (
          <div
            key={p._id}
            className="bg-white border rounded-md p-4 flex flex-col"
          >
            {p.image && (
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-cover mb-3 rounded"
              />
            )}

            <h2 className="font-bold text-lg">{p.name}</h2>
            
          {/* ACTUAL PRICE */}
{hasDiscount && (
  <p className="text-xs">
    Actual Price: ₹{p.actualPrice} / piece
  </p>
)}

{/* SELLING PRICE */}
<p className="text-sm font-semibold text-green-600">
  Selling Price: ₹{p.pricePerPiece} / piece
</p>

{/* DISCOUNT */}
{hasDiscount && (
  <p className="text-xs text-green-700 font-medium">
    {discountPercent}% OFF
  </p>
)}


            <p className="text-sm mt-1">
              {p.piecesPerBox} pcs / box
            </p>

            {/* PIECES */}
            <div className="flex justify-between items-center mt-3 text-sm">
              <span className="font-medium">Pieces</span>
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
            <div className="flex justify-between items-center mt-2 text-sm">
              <span className="font-medium">Boxes</span>
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
