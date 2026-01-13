import { useContext } from "react";
import { CartContext } from "../context/cart";
import CartItem from "../components/cartitem";
import API from "../services/api";

export default function Cart() {
  const { cart, updateQty, clearCart } = useContext(CartContext);

  const total = cart.reduce(
    (sum, c) =>
      sum +
      c.pieces * c.product.pricePerPiece +
      c.boxes * c.product.boxPrice,
    0
  );

const placeOrder = async () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  try {
    await API.post("/orders", {
      items: cart.map(c => ({
        product: c.product._id,
        boxes: c.boxes,
        pieces: c.pieces
      })),
      totalAmount: total
    });

    clearCart();
    alert("Order placed successfully");
  } catch (err) {
    alert(
      err.response?.data?.message ||
      "Order could not be placed"
    );
  }
};



  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
      {cart.map(item => (
        <CartItem
          key={item.product._id}
          item={item}
          onUpdate={updateQty}
        />
      ))}

      <div className="  border-t pt-4
  text-right text-lg font-semibold">
        Total: ₹{total}
      </div>

<button 
  onClick={placeOrder}
  disabled={cart.length === 0}
  className={`className="mt-4 w-full bg-blue-600
  hover:bg-blue-700 text-white py-3 rounded" ${
    cart.length === 0
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600"
  }`}
>
  Place Order
</button>

    </div>
  );
}
