import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Shuffle } from "lucide-react";

interface NumberInputProps {
  selectedNumbers: string;
  amount: number;
  onNumberChange: (value: string) => void;
  onAmountChange: (value: number) => void;
  onAddToCart: () => void;
  onRandomGenerate: () => void;
}

const NumberInput = ({ 
  selectedNumbers, 
  amount, 
  onNumberChange, 
  onAmountChange, 
  onAddToCart,
  onRandomGenerate 
}: NumberInputProps) => {
  return (
    <Card className="p-6 space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium">ป้อนเลขที่ต้องการซื้อ (1-6 หลัก)</label>
          <Button
            variant="outline"
            size="sm"
            onClick={onRandomGenerate}
            className="gap-2"
          >
            <Shuffle className="h-4 w-4" />
            สุ่มเลข
          </Button>
        </div>
        <Input
          type="text"
          maxLength={6}
          value={selectedNumbers}
          onChange={(e) => onNumberChange(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder="กรอกเลข 1-6 หลัก เช่น 12, 112, 1234"
          className="text-center text-2xl font-bold h-14"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">ราคา (บาท)</label>
        <Input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => onAmountChange(parseInt(e.target.value) || 1)}
          className="text-center text-2xl font-bold h-14"
          placeholder="10"
        />
      </div>

      <Button onClick={onAddToCart} className="w-full bg-gradient-primary text-lg py-6">
        <Plus className="mr-2 h-5 w-5" /> เพิ่มลงตะกร้า
      </Button>
    </Card>
  );
};

export default NumberInput;

