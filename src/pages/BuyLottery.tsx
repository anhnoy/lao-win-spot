import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import LotteryTypeSelector from "@/components/lottery/LotteryTypeSelector";
import NumberInput from "@/components/lottery/NumberInput";
import Cart from "@/components/lottery/Cart";
import { useCartContext } from "@/contexts/CartContext";
import { LOTTERY_TYPES } from "@/constants/lottery";
import { LotteryType } from "@/types/lottery";
import { toast } from "sonner";
import { useWallet } from "@/hooks/useWallet";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const BuyLottery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedNumbers, setSelectedNumbers] = useState<string>("");
  const [amount, setAmount] = useState<number>(10);
  const [selectedLottery, setSelectedLottery] = useState(LOTTERY_TYPES[0]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Check if there's a pre-selected lottery from navigation state
  useEffect(() => {
    const state = location.state as { selectedLottery?: LotteryType };
    if (state?.selectedLottery) {
      setSelectedLottery(state.selectedLottery);
    }
  }, [location.state]);
  
  const { cart, addToCart, removeFromCart, getTotalPrice, clearCart } = useCartContext();
  const { wallet, loading: walletLoading, withdraw, refresh } = useWallet();

  const handleAddToCart = () => {
    if (!selectedNumbers) {
      toast.error("กรุณากรอกเลขที่ต้องการซื้อ");
      return;
    }
    const success = addToCart(selectedNumbers, amount);
    if (success) {
      setSelectedNumbers("");
      setAmount(10);
    }
  };

  const handleRandomGenerate = () => {
    const length = Math.floor(Math.random() * 5) + 2; // 2-6 digits
    const randomNum = Math.floor(Math.random() * Math.pow(10, length))
      .toString()
      .padStart(length, '0');
    setSelectedNumbers(randomNum);
    toast.success("สุ่มเลขเรียบร้อย");
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("ตะกร้าว่างเปล่า");
      return;
    }

    // Check if user is logged in
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error("กรุณาเข้าสู่ระบบก่อนทำการซื้อ");
      navigate("/login");
      return;
    }

    setShowConfirmDialog(true);
  };

  const handleConfirmPayment = async () => {
    const totalPrice = getTotalPrice();

    if (walletLoading) {
      toast.error("กำลังโหลดข้อมูลกระเป๋าเงิน...");
      return;
    }

    if (!wallet || wallet.balance < totalPrice) {
      toast.error("ยอดเงินในกระเป๋าไม่เพียงพอ กรุณาเติมเงิน");
      setShowConfirmDialog(false);
      return;
    }

    try {
      // Withdraw money from wallet
      await withdraw(totalPrice);
      
      // Create lottery purchase record
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { error: purchaseError } = await supabase
          .from('transactions')
          .insert({
            user_id: session.user.id,
            type: 'purchase',
            amount: -totalPrice,
            status: 'completed'
          });

        if (purchaseError) {
          console.error('Error recording purchase:', purchaseError);
        }
      }

      toast.success("ซื้อหวยสำเร็จ!");
      clearCart();
      refresh();
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error("เกิดข้อผิดพลาดในการชำระเงิน");
    }

    setShowConfirmDialog(false);
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
            onRandomGenerate={handleRandomGenerate}
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

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการซื้อ</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>ยอดรวมที่ต้องชำระ: <span className="font-bold text-primary">{getTotalPrice().toLocaleString()} ฿</span></p>
              <p>ยอดเงินคงเหลือในกระเป๋า: <span className="font-bold">{wallet?.balance.toLocaleString() || 0} ฿</span></p>
              {wallet && wallet.balance >= getTotalPrice() && (
                <p>ยอดคงเหลือหลังการซื้อ: <span className="font-bold text-green-600">{(wallet.balance - getTotalPrice()).toLocaleString()} ฿</span></p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmPayment}>
              ยืนยันการชำระเงิน
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BuyLottery;
