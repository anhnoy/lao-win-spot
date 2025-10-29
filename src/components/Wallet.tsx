import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet as WalletIcon, TrendingUp, Download, Upload, History } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useWallet } from "@/hooks/useWallet";
import { DepositDialog } from "./wallet/DepositDialog";
import { WithdrawDialog } from "./wallet/WithdrawDialog";
import { TransactionHistoryDialog } from "./wallet/TransactionHistoryDialog";
import { format } from "date-fns";

interface WalletProps {
  balance?: number;
  compact?: boolean; // For sidebar mode
}

const Wallet = ({ compact = false }: WalletProps) => {
  const { wallet, transactions, loading, deposit, withdraw } = useWallet();
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">กำลังโหลด...</p>
      </div>
    );
  }

  return (
    <div className={compact ? "" : "min-h-screen bg-background"}>
      <div className={compact ? "space-y-4" : "container mx-auto px-4 py-8 space-y-8"}>
        {/* Header */}
        <div className={`${compact ? 'mb-4' : 'text-center mb-8'} animate-fade-in`}>
          <h1 className={`${compact ? 'text-2xl' : 'text-4xl'} font-bold font-thai text-foreground ${compact ? 'mb-2' : 'mb-3'} tracking-tight`}>
            กระเป๋าเงิน
          </h1>
          <p className={`text-muted-foreground ${compact ? 'text-sm' : 'text-lg'}`}>จัดการยอดเงินและธุรกรรมของคุณ</p>
        </div>

        {/* Balance Cards */}
        <div className={`grid grid-cols-1 ${compact ? 'gap-3' : 'md:grid-cols-2 gap-8 max-w-5xl mx-auto'}`}>
          {/* Main Balance Card */}
          <Card className={`relative overflow-hidden border-0 bg-gradient-primary shadow-lg ${compact ? '' : 'hover:shadow-2xl transition-all duration-300 hover:scale-105'} animate-fade-in`}>
            {!compact && (
              <>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />
              </>
            )}
            <CardContent className={`${compact ? 'p-4' : 'p-8'} relative z-10`}>
              <div className={`flex items-center justify-between ${compact ? 'mb-3' : 'mb-6'}`}>
                <div className="flex items-center gap-2">
                  <div className={`${compact ? 'p-2' : 'p-3'} bg-white/20 rounded-full backdrop-blur-sm`}>
                    <WalletIcon className={`${compact ? 'w-4 h-4' : 'w-6 h-6'} text-primary-foreground`} />
                  </div>
                  <div>
                    <p className="text-primary-foreground/80 text-xs font-medium">ยอดเงินรวม</p>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <p className={`${compact ? 'text-4xl' : 'text-6xl'} font-extrabold text-primary-foreground tracking-tight`}>
                  {(wallet?.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className={`${compact ? 'text-xl' : 'text-2xl'} font-bold text-primary-foreground/90`}>฿</p>
              </div>
            </CardContent>
          </Card>

          {/* Referral Balance Card */}
          <Card className={`relative overflow-hidden border-0 bg-gradient-gold shadow-lg ${compact ? '' : 'hover:shadow-2xl transition-all duration-300 hover:scale-105'} animate-fade-in`} style={{ animationDelay: '0.1s' }}>
            {!compact && (
              <>
                <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full -ml-12 -mb-12" />
              </>
            )}
            <CardContent className={`${compact ? 'p-4' : 'p-8'} relative z-10`}>
              <div className={`flex items-center justify-between ${compact ? 'mb-3' : 'mb-6'}`}>
                <div className="flex items-center gap-2">
                  <div className={`${compact ? 'p-2' : 'p-3'} bg-black/10 rounded-full backdrop-blur-sm`}>
                    <TrendingUp className={`${compact ? 'w-4 h-4' : 'w-6 h-6'} text-accent-foreground`} />
                  </div>
                  <div>
                    <p className="text-accent-foreground/80 text-xs font-medium">เงินแนะนำเพื่อน</p>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <p className={`${compact ? 'text-4xl' : 'text-6xl'} font-extrabold text-accent-foreground tracking-tight`}>
                  {(wallet?.referral_balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className={`${compact ? 'text-xl' : 'text-2xl'} font-bold text-accent-foreground/90`}>฿</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card className={`${compact ? '' : 'max-w-5xl mx-auto'} shadow-md hover:shadow-lg transition-shadow animate-fade-in`} style={{ animationDelay: '0.2s' }}>
          <CardContent className={compact ? 'p-4' : 'p-8'}>
            <h2 className={`${compact ? 'text-base' : 'text-xl'} font-bold font-thai ${compact ? 'mb-3' : 'mb-6'}`}>ดำเนินการ</h2>
            <div className={`grid grid-cols-1 ${compact ? 'gap-2' : 'sm:grid-cols-3 gap-4'}`}>
              <Button 
                size={compact ? "default" : "lg"}
                className={`${compact ? 'h-11 text-sm' : 'h-14 text-lg'} font-thai gap-2 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all`}
                onClick={() => setDepositDialogOpen(true)}
              >
                <Download className={compact ? 'w-4 h-4' : 'w-5 h-5'} />
                ฝากเงิน
              </Button>
              <Button 
                size={compact ? "default" : "lg"}
                variant="destructive" 
                className={`${compact ? 'h-11 text-sm' : 'h-14 text-lg'} font-thai gap-2 shadow-md hover:shadow-lg transition-all`}
                onClick={() => setWithdrawDialogOpen(true)}
              >
                <Upload className={compact ? 'w-4 h-4' : 'w-5 h-5'} />
                ถอนเงิน
              </Button>
              <Button 
                size={compact ? "default" : "lg"}
                variant="outline" 
                className={`${compact ? 'h-11 text-sm' : 'h-14 text-lg'} font-thai gap-2 hover:bg-muted shadow-sm hover:shadow-md transition-all`}
                onClick={() => setHistoryDialogOpen(true)}
              >
                <History className={compact ? 'w-4 h-4' : 'w-5 h-5'} />
                ประวัติธุรกรรม
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className={`${compact ? '' : 'max-w-5xl mx-auto'} shadow-md hover:shadow-lg transition-shadow animate-fade-in`} style={{ animationDelay: '0.3s' }}>
          <CardContent className={compact ? 'p-4' : 'p-8'}>
            <h2 className={`${compact ? 'text-base' : 'text-xl'} font-bold font-thai ${compact ? 'mb-3' : 'mb-6'}`}>ธุรกรรมล่าสุด</h2>
            <div className="overflow-x-auto -mx-4 px-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className={`${compact ? 'px-2 py-2 text-xs' : 'px-6 py-4 text-base'} text-left font-bold text-foreground`}>วันที่</th>
                    <th className={`${compact ? 'px-2 py-2 text-xs' : 'px-6 py-4 text-base'} text-left font-bold text-foreground`}>ประเภท</th>
                    <th className={`${compact ? 'px-2 py-2 text-xs' : 'px-6 py-4 text-base'} text-right font-bold text-foreground`}>จำนวน</th>
                    <th className={`${compact ? 'px-2 py-2 text-xs' : 'px-6 py-4 text-base'} text-center font-bold text-foreground`}>สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={4} className={`${compact ? 'px-2 py-4' : 'px-6 py-8'} text-center text-muted-foreground`}>
                        ไม่มีธุรกรรม
                      </td>
                    </tr>
                  ) : (
                    transactions.slice(0, 5).map((tx) => {
                      const typeLabels: { [key: string]: string } = {
                        deposit: 'ฝากเงิน',
                        withdrawal: 'ถอนเงิน',
                        purchase: 'ซื้อหวย',
                        refund: 'คืนเงิน',
                        referral: 'แนะนำเพื่อน'
                      };
                      
                      return (
                        <tr 
                          key={tx.id} 
                          className="border-b border-border hover:bg-muted/50 transition-colors group"
                        >
                          <td className={`${compact ? 'px-2 py-2 text-xs' : 'px-6 py-5 text-base'} text-muted-foreground group-hover:text-foreground transition-colors`}>
                            {format(new Date(tx.created_at), 'dd/MM/yyyy HH:mm')}
                          </td>
                          <td className={`${compact ? 'px-2 py-2 text-xs' : 'px-6 py-5 text-base'} font-semibold`}>
                            {typeLabels[tx.type] || tx.type}
                          </td>
                          <td className={`${compact ? 'px-2 py-2 text-xs' : 'px-6 py-5 text-base'} text-right font-bold ${
                            tx.type === 'withdrawal' ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {tx.type === 'withdrawal' ? '-' : '+'}
                            {tx.amount.toFixed(2)}
                          </td>
                          <td className={`${compact ? 'px-2 py-2' : 'px-6 py-5'} text-center`}>
                            <Badge 
                              variant={tx.status === "completed" ? "default" : "secondary"}
                              className={`${compact ? 'px-2 py-0.5 text-xs' : 'px-4 py-1 text-sm'} font-semibold ${
                                tx.status === "completed" 
                                  ? "bg-success hover:bg-success text-success-foreground" 
                                  : "bg-muted hover:bg-muted"
                              }`}
                            >
                              {tx.status === 'completed' ? 'สำเร็จ' : tx.status}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <DepositDialog
        open={depositDialogOpen}
        onOpenChange={setDepositDialogOpen}
        onDeposit={deposit}
      />
      <WithdrawDialog
        open={withdrawDialogOpen}
        onOpenChange={setWithdrawDialogOpen}
        onWithdraw={withdraw}
        maxAmount={wallet?.balance || 0}
      />
      <TransactionHistoryDialog
        open={historyDialogOpen}
        onOpenChange={setHistoryDialogOpen}
        transactions={transactions}
      />
    </div>
  );
};

export default Wallet;
