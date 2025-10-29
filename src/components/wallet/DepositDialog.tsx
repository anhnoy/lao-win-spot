import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DepositDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeposit: (amount: number) => Promise<void>;
}

export const DepositDialog = ({ open, onOpenChange, onDeposit }: DepositDialogProps) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const quickAmounts = [100, 500, 1000, 5000];

  const handleDeposit = async () => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      return;
    }

    setLoading(true);
    await onDeposit(depositAmount);
    setLoading(false);
    setAmount('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ฝากเงิน</DialogTitle>
          <DialogDescription>
            กรุณาระบุจำนวนเงินที่ต้องการฝาก
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">จำนวนเงิน (บาท)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {quickAmounts.map((quickAmount) => (
              <Button
                key={quickAmount}
                variant="outline"
                size="sm"
                onClick={() => setAmount(quickAmount.toString())}
              >
                {quickAmount}
              </Button>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            ยกเลิก
          </Button>
          <Button onClick={handleDeposit} disabled={loading || !amount}>
            {loading ? 'กำลังดำเนินการ...' : 'ฝากเงิน'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
