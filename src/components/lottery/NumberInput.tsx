import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";
import { QUICK_NUMBERS } from "@/constants/lottery";

interface NumberInputProps {
  selectedNumbers: string;
  amount: number;
  onNumberChange: (numbers: string) => void;
  onAmountChange: (amount: number) => void;
  onAddToCart: () => void;
}

const NumberInput = ({
  selectedNumbers,
  amount,
  onNumberChange,
  onAmountChange,
  onAddToCart,
}: NumberInputProps) => {
  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4 font-thai">กรอกหมายเลข</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">เลขที่ต้องการซื้อ (2 หลัก)</label>
            <Input
              type="text"
              maxLength={2}
              value={selectedNumbers}
              onChange={(e) => onNumberChange(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="กรอกเลข 2 หลัก"
              className="text-center text-2xl font-bold h-14"
            />
          </div>

          <div className="grid grid-cols-5 gap-2">
            {QUICK_NUMBERS.map((num) => (
              <Button
                key={num}
                variant="outline"
                onClick={() => onNumberChange(num)}
                className="h-12 font-semibold"
              >
                {num}
              </Button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">จำนวนเงิน (บาท)</label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onAmountChange(Math.max(1, amount - 1))}
                className="h-12 w-12"
              >
                <Minus className="h-5 w-5" />
              </Button>

              <Input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => onAmountChange(parseInt(e.target.value) || 1)}
                className="text-center text-xl font-bold h-12 flex-1"
              />

              <Button
                variant="outline"
                size="icon"
                onClick={() => onAmountChange(amount + 1)}
                className="h-12 w-12"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <Button 
            onClick={onAddToCart} 
            className="w-full h-12 text-lg bg-gradient-primary"
            disabled={selectedNumbers.length !== 2}
          >
            เพิ่มลงตะกร้า
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NumberInput;
