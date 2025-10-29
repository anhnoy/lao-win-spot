import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TransactionData } from '@/hooks/useWallet';
import { format } from 'date-fns';

interface TransactionHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactions: TransactionData[];
}

const getTransactionTypeLabel = (type: string) => {
  const labels: { [key: string]: string } = {
    deposit: 'ฝากเงิน',
    withdrawal: 'ถอนเงิน',
    purchase: 'ซื้อหวย',
    refund: 'คืนเงิน',
    referral: 'แนะนำเพื่อน'
  };
  return labels[type] || type;
};

const getStatusBadge = (status: string) => {
  const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    completed: "default",
    pending: "secondary",
    failed: "destructive",
    cancelled: "outline"
  };
  
  const labels: { [key: string]: string } = {
    completed: 'สำเร็จ',
    pending: 'รอดำเนินการ',
    failed: 'ล้มเหลว',
    cancelled: 'ยกเลิก'
  };

  return <Badge variant={variants[status] || "outline"}>{labels[status] || status}</Badge>;
};

export const TransactionHistoryDialog = ({ open, onOpenChange, transactions }: TransactionHistoryDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>ประวัติธุรกรรม</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>วันที่</TableHead>
                <TableHead>ประเภท</TableHead>
                <TableHead className="text-right">จำนวนเงิน</TableHead>
                <TableHead>สถานะ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    ไม่มีประวัติธุรกรรม
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {format(new Date(transaction.created_at), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                    <TableCell>{getTransactionTypeLabel(transaction.type)}</TableCell>
                    <TableCell className="text-right">
                      <span className={transaction.type === 'withdrawal' ? 'text-red-500' : 'text-green-500'}>
                        {transaction.type === 'withdrawal' ? '-' : '+'}
                        {transaction.amount.toFixed(2)} ฿
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
