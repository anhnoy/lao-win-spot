import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Plus, Minus, Trash2, Clock } from "lucide-react";
import { toast } from "sonner";

interface CartItem {
  id: string;
  number: string;
  amount: number;
  price: number;
}

const BuyLottery = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);
  const [cart, setCart] = useState<CartItem[]>([]);

  const lotteryTypes = [
    { id: "1", name: "หวยลาวพัฒนา", closing: "15:30", prize: "x900", status: "open" },
    { id: "2", name: "หวยลาว VIP", closing: "16:00", prize: "x950", status: "open" },
    { id: "3", name: "หวยลาว TV", closing: "17:30", prize: "x850", status: "closed" },
  ];

  const [selectedLottery, setSelectedLottery] = useState(lotteryTypes[0]);

  const quickNumbers = ["12", "23", "34", "45", "56", "67", "78", "89", "90", "01"];

  const handleAddToCart = () => {
    if (selectedNumbers.length !== 6) {
      toast.error("กรุณาใส่เลข 1-6 หลัก");
      return;
    }

    const newItem: CartItem = {
      id: Date.now().toString(),
      number: selectedNumbers,
      amount: amount,
      price: amount * 80, // 80 บาทต่อใบ
    };

    setCart([...cart, newItem]);
    setSelectedNumbers("");
    setAmount(1);
    toast.success("เพิ่มลงตะกร้าเรียบร้อย");
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
    toast.success("ลบออกจากตะกร้าแล้ว");
  };

  const handleQuickSelect = (num: string) => {
    setSelectedNumbers(num);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

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
            {/* Lottery Type Selection */}
            <Card className="p-6">
              <h2 className="text-xl font-bold font-thai mb-4">เลือกประเภทหวย</h2>
              <div className="grid gap-3">
                {lotteryTypes.map((lottery) => (
                  <div
                    key={lottery.id}
                    onClick={() => lottery.status === "open" && setSelectedLottery(lottery)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedLottery.id === lottery.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    } ${lottery.status === "closed" ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold font-thai">{lottery.name}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            ปิดรับ {lottery.closing} น.
                          </span>
                          <span className="text-accent font-semibold">จ่าย {lottery.prize}</span>
                        </div>
                      </div>
                      <Badge className={lottery.status === "open" ? "bg-success" : "bg-destructive"}>
                        {lottery.status === "open" ? "เปิดรับ" : "ปิดรับ"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Number Selection */}
            <Card className="p-6">
              <Tabs defaultValue="manual" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="manual">กดเลขเอง</TabsTrigger>
                  <TabsTrigger value="quick">เลขด่วน</TabsTrigger>
                </TabsList>

                <TabsContent value="manual" className="space-y-4 mt-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">ใส่เลข 2 หลัก</label>
                    <Input
                      type="text"
                      maxLength={2}
                      value={selectedNumbers}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        setSelectedNumbers(value);
                      }}
                      placeholder="00"
                      className="text-center text-2xl font-bold h-16"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">จำนวน (ใบ)</label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setAmount(Math.max(1, amount - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={amount}
                        onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
                        className="text-center text-xl font-bold h-12"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setAmount(amount + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      ราคา: {amount * 80} บาท (80 บาท/ใบ)
                    </p>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-primary"
                    size="lg"
                    disabled={selectedNumbers.length !== 2}
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    เพิ่มลงตะกร้า
                  </Button>
                </TabsContent>

                <TabsContent value="quick" className="space-y-4 mt-6">
                  <p className="text-sm text-muted-foreground">เลือกเลขยอดนิยม</p>
                  <div className="grid grid-cols-5 gap-3">
                    {quickNumbers.map((num) => (
                      <Button
                        key={num}
                        variant="outline"
                        className="h-16 text-xl font-bold hover:bg-primary hover:text-primary-foreground"
                        onClick={() => handleQuickSelect(num)}
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Right Side - Cart */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold font-thai">ตะกร้า</h2>
                <Badge variant="secondary">{cart.length}</Badge>
              </div>

              <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p>ตะกร้าว่างเปล่า</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-bold text-lg">เลข {item.number}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.amount} ใบ × 80 บาท
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-bold">{item.price} ฿</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <>
                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>ยอดรวม</span>
                      <span className="text-2xl bg-gradient-gold bg-clip-text text-transparent">
                        {totalPrice.toLocaleString()} ฿
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-gold hover:opacity-90" size="lg">
                    ยืนยันการซื้อ
                  </Button>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyLottery;
