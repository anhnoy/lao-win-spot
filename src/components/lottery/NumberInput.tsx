import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Trash2 } from "lucide-react";

// 🧮 ส่วนกรอกเลขและราคา
function NumberInput({ onAdd }: { onAdd: (num: string, price: number) => void }) {
  const [number, setNumber] = useState("");
  const [price, setPrice] = useState(10);

  const handleAdd = () => {
    if (!number || price <= 0) return;
    onAdd(number, price);
    setNumber("");
    setPrice(10);
  };

  return (
    <Card className="p-4 space-y-3">
      <div>
        <label className="block text-sm font-medium">เลขที่ต้องการซื้อ</label>
        <Input
          type="text"
          maxLength={6}
          value={number}
          onChange={(e) => setNumber(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder="เช่น 12"
          className="text-center text-xl font-bold h-12"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">ราคา (บาท)</label>
        <Input
          type="number"
          min="1"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
          className="text-center text-xl font-bold h-12"
        />
      </div>

      <Button onClick={handleAdd} className="w-full bg-gradient-primary">
        <Plus className="mr-2 h-5 w-5" /> เพิ่มรายการ
      </Button>
    </Card>
  );
}

// 🧾 ส่วนรายการทั้งหมด
function CartList({
  items,
  onRemove,
  onPriceChange,
}: {
  items: { number: string; price: number }[];
  onRemove: (i: number) => void;
  onPriceChange: (i: number, newPrice: number) => void;
}) {
  const total = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <Card className="p-4 mt-4 space-y-3">
      <h3 className="font-bold text-lg">🧾 รายการที่เลือก</h3>
      {items.length === 0 ? (
        <p className="text-muted-foreground">ยังไม่มีรายการ</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-2"
            >
              <span className="font-semibold text-lg">เลข {item.number}</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onPriceChange(index, Math.max(1, item.price - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <span className="w-10 text-center font-bold">{item.price}</span>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onPriceChange(index, item.price + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>

                <span className="text-sm text-muted-foreground">บาท</span>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(index)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}

          <div className="pt-3 font-bold text-right border-t">
            รวมทั้งหมด: <span className="text-xl">{total}</span> บาท
          </div>
        </div>
      )}
    </Card>
  );
}

// 💰 รวมทุกอย่างในหน้าเดียว
export default function LotteryPage() {
  const [cart, setCart] = useState<{ number: string; price: number }[]>([]);

  const handleAdd = (num: string, price: number) => {
    setCart([...cart, { number: num, price }]);
  };

  const handleRemove = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handlePriceChange = (index: number, newPrice: number) => {
    setCart(
      cart.map((item, i) => (i === index ? { ...item, price: newPrice } : item))
    );
  };

  const handleCheckout = () => {
    const total = cart.reduce((sum, i) => sum + i.price, 0);
    alert(`ยอดรวมทั้งหมด ${total} บาท\nพร้อมชำระหรือไม่`);
  };

  return (
    <div className="container mx-auto p-6 max-w-lg space-y-6">
      <NumberInput onAdd={handleAdd} />
      <CartList
        items={cart}
        onRemove={handleRemove}
        onPriceChange={handlePriceChange}
      />
      {cart.length > 0 && (
        <Button
          onClick={handleCheckout}
          className="w-full bg-gradient-gold text-lg font-bold py-6"
        >
          ดำเนินการจ่ายเงิน
        </Button>
      )}
    </div>
  );
}
