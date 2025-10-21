import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Minus } from "lucide-react";
import { QUICK_NUMBERS, LOTTERY_PRICE_PER_TICKET } from "@/constants/lottery";

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
  onAddToCart,
}: NumberInputProps) => {
  return (
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
                onNumberChange(value);
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
                onClick={() => onAmountChange(Math.max(1, amount - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => onAmountChange(Math.max(1, parseInt(e.target.value) || 1))}
                className="text-center text-xl font-bold h-12"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => onAmountChange(amount + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              ราคา: {amount * LOTTERY_PRICE_PER_TICKET} บาท ({LOTTERY_PRICE_PER_TICKET} บาท/ใบ)
            </p>
          </div>

          <Button
            onClick={onAddToCart}
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
            {QUICK_NUMBERS.map((num) => (
              <Button
                key={num}
                variant="outline"
                className="h-16 text-xl font-bold hover:bg-primary hover:text-primary-foreground"
                onClick={() => onNumberChange(num)}
              >
                {num}
              </Button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default NumberInput;
