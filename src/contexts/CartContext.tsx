import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CartItem } from "@/types/lottery";
import { LOTTERY_PRICE_PER_TICKET } from "@/constants/lottery";
import { toast } from "sonner";

interface CartContextType {
  cart: CartItem[];
  addToCart: (number: string, amount: number) => boolean;
  removeFromCart: (id: string) => void;
  getTotalPrice: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((number: string, amount: number) => {
    if (number.length < 2 || number.length > 6) {
      toast.error("กรุณาใส่เลข 2-6 หลัก");
      return false;
    }

    const newItem: CartItem = {
      id: Date.now().toString(),
      number: number,
      amount: amount,
      price: amount * LOTTERY_PRICE_PER_TICKET,
    };

    setCart(prev => [...prev, newItem]);
    toast.success("เพิ่มลงตะกร้าเรียบร้อย");
    return true;
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.success("ลบออกจากตะกร้าแล้ว");
  }, []);

  const getTotalPrice = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }, [cart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
