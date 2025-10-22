import { useState } from "react";
import Navbar from "@/components/Navbar";
import LotteryTypeSelector from "@/components/lottery/LotteryTypeSelector";
import NumberInput from "@/components/lottery/NumberInput";
import Cart from "@/components/lottery/Cart";
import { useCartContext } from "@/contexts/CartContext";
import { LOTTERY_TYPES } from "@/constants/lottery";
import { toast } from "sonner";

const BuyLottery = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);
  const [selectedLottery, setSelectedLottery] = useState(LOTTERY_TYPES[0]);
  
  const { cart, addToCart, removeFromCart, getTotalPrice, clearCart } = useCartContext();

  const handleAddToCart = () => {
    const success = addToCart(selectedNumbers, amount);
    if (success) {
      setSelectedNumbers("");
      setAmount(1);
    }
  };

  const handleCheckout = () => {
    toast.success("กำลังดำเนินการชำระเงิน...");
    clearCart();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold font-thai mb-2">ซื้อหวยลาว</h1>
          <p className="text-muted-foreground">เลือกประเภทหวยและหมายเลขที่คุณต้องการ</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Side - Lottery Selection */}
          <div className="lg:col-span-2 space-y-6">
            <LotteryTypeSelector
              lotteryTypes={LOTTERY_TYPES}
              selectedLottery={selectedLottery}
              onSelectLottery={setSelectedLottery}
            />

            <NumberInput
              selectedNumbers={selectedNumbers}
              amount={amount}
              onNumberChange={setSelectedNumbers}
              onAmountChange={setAmount}
              onAddToCart={handleAddToCart}
            />
          </div>

          {/* Right Side - Cart */}
          <div className="lg:col-span-1">
            <Cart
              items={cart}
              onRemove={removeFromCart}
              totalPrice={getTotalPrice()}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyLottery;
