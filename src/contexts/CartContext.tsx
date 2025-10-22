import { createContext, useContext, ReactNode } from "react";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/types/lottery";

interface CartContextType {
  cart: CartItem[];
  addToCart: (number: string, amount: number) => boolean;
  removeFromCart: (id: string) => void;
  getTotalPrice: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const cartHook = useCart();

  return (
    <CartContext.Provider value={cartHook}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within CartProvider");
  }
  return context;
};
