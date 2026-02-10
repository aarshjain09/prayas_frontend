import QuantitySelector from "./quantityselector";

export default function ProductCard({
  product,
  cartItem,
  updateQty
}) {
  const pieces = cartItem?.pieces || 0;
  const boxes = cartItem?.boxes || 0;

  return (
    <div className="bg-white border rounded-md p-4">
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover mb-3"
        />
      )}

      <h2 className="font-bold">{product.name}</h2>
      <p>₹{product.pricePerPiece} / piece</p>

      <div className="flex justify-between items-center mt-3">
        <span>Pieces</span>
        <QuantitySelector
          value={pieces}
          onChange={(v) =>
            updateQty(product._id, "pieces", v)
          }
        />
      </div>

      <div className="flex justify-between items-center mt-2">
        <span>Boxes</span>
        <QuantitySelector
          value={boxes}
          onChange={(v) =>
            updateQty(product._id, "boxes", v)
          }
        />
      </div>
    </div>
  );
}
