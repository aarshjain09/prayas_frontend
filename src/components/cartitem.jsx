import QuantitySelector from "./quantityselector";

export default function CartItem({ item, onUpdate }) {
  const { product, pieces, boxes } = item;

  return (
    <div className="border p-4 rounded space-y-2">
       {product.image && (
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          className="w-20 h-20 object-cover rounded border"
        />
      )}
      <h2 className="font-semibold">{product.name}</h2>

      <div className="flex justify-between items-center">
        <span>Pieces</span>
        <QuantitySelector
          value={pieces}
          onChange={(v) => onUpdate(product._id, "pieces", v)}
        />
      </div>

      <div className="flex justify-between items-center">
        <span>Boxes</span>
        <QuantitySelector
          value={boxes}
          onChange={(v) => onUpdate(product._id, "boxes", v)}
        />
      </div>

      <div className="text-sm text-gray-600">
        ₹{pieces * product.pricePerPiece +
          boxes * product.boxPrice}
      </div>
    </div>
  );
}
