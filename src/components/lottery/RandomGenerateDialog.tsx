import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shuffle } from "lucide-react";

interface RandomGenerateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (numbers: { number: string; amount: number }[]) => void;
  defaultAmount: number;
}

const DIGIT_OPTIONS = [
  { value: "2", label: "2 หลัก" },
  { value: "3", label: "3 หลัก" },
  { value: "4", label: "4 หลัก" },
  { value: "5", label: "5 หลัก" },
  { value: "6", label: "6 หลัก" },
];

const RandomGenerateDialog = ({
  open,
  onOpenChange,
  onGenerate,
  defaultAmount,
}: RandomGenerateDialogProps) => {
  const [digits, setDigits] = useState("2");
  const [amount, setAmount] = useState(defaultAmount);
  const [sets, setSets] = useState(1);

  const handleGenerate = () => {
    const numDigits = parseInt(digits);
    const generatedNumbers: { number: string; amount: number }[] = [];

    for (let i = 0; i < sets; i++) {
      const randomNum = Math.floor(Math.random() * Math.pow(10, numDigits))
        .toString()
        .padStart(numDigits, "0");
      generatedNumbers.push({ number: randomNum, amount });
    }

    onGenerate(generatedNumbers);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shuffle className="h-5 w-5" />
            สุ่มเลข
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Digit Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">เลือกจำนวนหลัก</Label>
            <RadioGroup
              value={digits}
              onValueChange={setDigits}
              className="grid grid-cols-5 gap-2"
            >
              {DIGIT_OPTIONS.map((option) => (
                <div key={option.value}>
                  <RadioGroupItem
                    value={option.value}
                    id={`digit-${option.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`digit-${option.value}`}
                    className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground cursor-pointer transition-colors"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-base font-medium">
              ราคาต่อชุด (บาท)
            </Label>
            <Input
              id="amount"
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
              className="text-center text-xl font-bold h-12"
            />
          </div>

          {/* Sets Input */}
          <div className="space-y-2">
            <Label htmlFor="sets" className="text-base font-medium">
              จำนวนชุด
            </Label>
            <Input
              id="sets"
              type="number"
              min="1"
              max="100"
              value={sets}
              onChange={(e) => setSets(Math.min(100, parseInt(e.target.value) || 1))}
              className="text-center text-xl font-bold h-12"
            />
          </div>

          {/* Summary */}
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm text-muted-foreground">สรุป</p>
            <p className="text-lg font-bold">
              สุ่ม {sets} ชุด × {amount} บาท = {(sets * amount).toLocaleString()} บาท
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            ยกเลิก
          </Button>
          <Button onClick={handleGenerate} className="bg-gradient-primary">
            <Shuffle className="mr-2 h-4 w-4" />
            สุ่มเลข
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RandomGenerateDialog;
