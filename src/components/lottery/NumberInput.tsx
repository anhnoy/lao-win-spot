import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus, Shuffle, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { LOTTERY_PRICE_PER_TICKET } from "@/constants/lottery";
import { toast } from "sonner";

interface NumberInputProps {
  onAddMultipleToCart: (numbers: string[], pricePerNumber: number) => void;
}

const NumberInput = ({ onAddMultipleToCart }: NumberInputProps) => {
  const [inputText, setInputText] = useState("");
  const [pricePerNumber, setPricePerNumber] = useState(LOTTERY_PRICE_PER_TICKET);
  const [parsedNumbers, setParsedNumbers] = useState<string[]>([]);

  const parseNumbers = (text: string) => {
    // Split by comma, newline, or space and filter valid numbers
    const numbers = text
      .split(/[,\s\n]+/)
      .map(n => n.trim())
      .filter(n => /^\d{1,6}$/.test(n));
    
    setParsedNumbers(numbers);
  };

  const handleInputChange = (value: string) => {
    setInputText(value);
    parseNumbers(value);
  };

  const generateRandomNumbers = () => {
    const count = Math.floor(Math.random() * 3) + 3; // 3-5 numbers
    const randomNums: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const length = Math.floor(Math.random() * 4) + 2; // 2-5 digits
      const num = Math.floor(Math.random() * Math.pow(10, length))
        .toString()
        .padStart(length, '0');
      randomNums.push(num);
    }
    
    const newText = randomNums.join(', ');
    setInputText(newText);
    parseNumbers(newText);
    toast.success(`สุ่มเลข ${count} ชุดเรียบร้อย`);
  };

  const handleAddToCart = () => {
    if (parsedNumbers.length === 0) {
      toast.error("กรุณาใส่เลขที่ต้องการซื้อ");
      return;
    }

    onAddMultipleToCart(parsedNumbers, pricePerNumber);
    setInputText("");
    setParsedNumbers([]);
  };

  const removeNumber = (index: number) => {
    const newNumbers = parsedNumbers.filter((_, i) => i !== index);
    setParsedNumbers(newNumbers);
    setInputText(newNumbers.join(', '));
  };

  const totalPrice = parsedNumbers.length * pricePerNumber;

  return (
    <Card className="p-6 space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium">ป้อนเลขที่ต้องการซื้อ (1-6 หลัก)</label>
          <Button
            variant="outline"
            size="sm"
            onClick={generateRandomNumbers}
            className="gap-2"
          >
            <Shuffle className="h-4 w-4" />
            สุ่มเลข
          </Button>
        </div>
        <Textarea
          value={inputText}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="กรอกเลข คั่นด้วยเครื่องหมาย , หรือขึ้นบรรทัดใหม่&#10;เช่น: 12, 345, 6789"
          className="min-h-[100px] font-mono"
        />
        <p className="text-xs text-muted-foreground mt-1">
          สามารถใส่ได้หลายชุด คั่นด้วยเครื่องหมายจุลภาค หรือขึ้นบรรทัดใหม่
        </p>
      </div>

      {parsedNumbers.length > 0 && (
        <div>
          <label className="block text-sm font-medium mb-2">
            เลขที่จะเพิ่ม ({parsedNumbers.length} ชุด)
          </label>
          <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-lg max-h-[120px] overflow-y-auto">
            {parsedNumbers.map((num, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-lg px-3 py-1 gap-2"
              >
                {num}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => removeNumber(index)}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">ราคาต่อชุด (บาท)</label>
        <Input
          type="number"
          min="1"
          value={pricePerNumber}
          onChange={(e) => setPricePerNumber(parseInt(e.target.value) || LOTTERY_PRICE_PER_TICKET)}
          className="text-center text-xl font-bold"
        />
      </div>

      {parsedNumbers.length > 0 && (
        <div className="p-4 bg-primary/10 rounded-lg space-y-2">
          <h3 className="font-semibold text-sm">📊 สรุปการซื้อ</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>จำนวนชุด:</span>
              <span className="font-bold">{parsedNumbers.length} ชุด</span>
            </div>
            <div className="flex justify-between">
              <span>ราคาชุดละ:</span>
              <span className="font-bold">{pricePerNumber.toLocaleString()} บาท</span>
            </div>
            <div className="flex justify-between text-base pt-2 border-t">
              <span>รวมทั้งหมด:</span>
              <span className="font-bold text-primary text-lg">
                {totalPrice.toLocaleString()} บาท
              </span>
            </div>
          </div>
        </div>
      )}

      <Button 
        onClick={handleAddToCart} 
        className="w-full bg-gradient-primary text-lg py-6"
        disabled={parsedNumbers.length === 0}
      >
        <Plus className="mr-2 h-5 w-5" /> 
        เพิ่ม {parsedNumbers.length > 0 ? `${parsedNumbers.length} ชุด` : ''} ลงตะกร้า
      </Button>
    </Card>
  );
};

export default NumberInput;

