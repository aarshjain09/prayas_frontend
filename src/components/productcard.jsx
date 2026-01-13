export default function ProductCard({ product, addToCart }) {
  return (
    <div className="border rounded p-4">
      <h2 className="font-semibold">{product.name}</h2>
      <p>₹{product.pricePerPiece}/piece</p>
      <p>{product.piecesPerBox} pcs/box</p>

      <button
        className="mt-2 bg-green-600 text-white px-4 py-2 w-full rounded"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
