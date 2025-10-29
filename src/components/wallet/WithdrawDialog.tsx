import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface WithdrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWithdraw: (amount: number) => Promise<void>;
  maxAmount: number;
}

export const WithdrawDialog = ({ open, onOpenChange, onWithdraw, maxAmount }: WithdrawDialogProps) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const quickAmounts = [100, 500, 1000, 5000].filter(amt => amt <= maxAmount);

  const handleWithdraw = async () => {
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0 || withdrawAmount > maxAmount) {
      return;
    }

    setLoading(true);
    await onWithdraw(withdrawAmount);
    setLoading(false);
    setAmount('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ถอนเงิน</DialogTitle>
          <DialogDescription>
            ยอดเงินคงเหลือ: {maxAmount.toFixed(2)} บาท
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
              max={maxAmount}
              step="0.01"
            />
          </div>
          {quickAmounts.length > 0 && (
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
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            ยกเลิก
          </Button>
          <Button onClick={handleWithdraw} disabled={loading || !amount}>
            {loading ? 'กำลังดำเนินการ...' : 'ถอนเงิน'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
