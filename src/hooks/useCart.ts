import { useState, useCallback } from "react";
import { CartItem } from "@/types/lottery";
import { LOTTERY_PRICE_PER_TICKET } from "@/constants/lottery";
import { toast } from "sonner";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((number: string, amount: number) => {
    if (number.length !== 2) {
      toast.error("กรุณาใส่เลข 2 หลัก");
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

  return {
    cart,
    addToCart,
    removeFromCart,
    getTotalPrice,
    clearCart,
  };
};
