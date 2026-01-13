import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from localStorage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ADD TO CART (with pieces & boxes)
  const addToCart = (product, pieces = 0, boxes = 0) => {
    if (pieces === 0 && boxes === 0) return;

    setCart(prev => {
      const exists = prev.find(
        c => c.product._id === product._id
      );

      // If product already exists → add quantities
      if (exists) {
        return prev.map(c =>
          c.product._id === product._id
            ? {
                ...c,
                pieces: c.pieces + pieces,
                boxes: c.boxes + boxes
              }
            : c
        );
      }

      // New product
      return [
        ...prev,
        { product, pieces, boxes }
      ];
    });
  };

  // UPDATE QUANTITY FROM CART PAGE
  const updateQty = (id, type, value) => {
    setCart(prev =>
      prev.map(c =>
        c.product._id === id
          ? { ...c, [type]: Math.max(0, Number(value)) }
          : c
      )
    );
  };

  // CLEAR CART
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
