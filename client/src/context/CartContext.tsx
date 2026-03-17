import { createContext, useContext, useState } from "react";

interface CartContextType {
  cartCount: number;
  setCartCount: (count: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: any) => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <CartContext.Provider
      value={{ cartCount, setCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext)!;
};
