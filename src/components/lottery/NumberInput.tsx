import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface NumberInputProps {
  selectedNumbers: string;
  amount: number;
  onNumberChange: (value: string) => void;
  onAmountChange: (value: number) => void;
  onAddToCart: () => void;
}

const NumberInput = ({ 
  selectedNumbers, 
  amount, 
  onNumberChange, 
  onAmountChange, 
  onAddToCart 
}: NumberInputProps) => {
  return (
    <Card className="p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">เลขที่ต้องการซื้อ</label>
        <Input
          type="text"
          maxLength={6}
          value={selectedNumbers}
          onChange={(e) => onNumberChange(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder="กรอกเลข 2-6 หลัก"
          className="text-center text-2xl font-bold h-14"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">จำนวนเงิน (บาท)</label>
        <Input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => onAmountChange(parseInt(e.target.value) || 1)}
          className="text-center text-2xl font-bold h-14"
        />
      </div>

      <Button onClick={onAddToCart} className="w-full bg-gradient-primary text-lg py-6">
        <Plus className="mr-2 h-5 w-5" /> เพิ่มลงตะกร้า
      </Button>
    </Card>
  );
};

export default NumberInput;

