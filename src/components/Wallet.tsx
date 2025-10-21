import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet as WalletIcon, TrendingUp, Download, Upload, History } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface WalletProps {
  balance: number;
  compact?: boolean; // For sidebar mode
}

interface Transaction {
  date: string;
  type: string;
  amount: number;
  status: "สำเร็จ" | "รอดำเนินการ";
}

const Wallet = ({ balance: initialBalance, compact = false }: WalletProps) => {
  const [balance] = useState(initialBalance);
  const [referral] = useState(50000);

  // ตัวอย่างประวัติธุรกรรม
  const transactions: Transaction[] = [
    { date: "21/10/2025", type: "ฝากเงิน", amount: 500, status: "สำเร็จ" },
    { date: "20/10/2025", type: "ถอนเงิน", amount: 300, status: "รอดำเนินการ" },
    { date: "19/10/2025", type: "แนะนำเพื่อน", amount: 100, status: "สำเร็จ" },
  ];

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
                  {balance.toLocaleString()}
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
                  {referral.toLocaleString()}
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
              >
                <Download className={compact ? 'w-4 h-4' : 'w-5 h-5'} />
                ฝากเงิน
              </Button>
              <Button 
                size={compact ? "default" : "lg"}
                variant="destructive" 
                className={`${compact ? 'h-11 text-sm' : 'h-14 text-lg'} font-thai gap-2 shadow-md hover:shadow-lg transition-all`}
              >
                <Upload className={compact ? 'w-4 h-4' : 'w-5 h-5'} />
                ถอนเงิน
              </Button>
              <Button 
                size={compact ? "default" : "lg"}
                variant="outline" 
                className={`${compact ? 'h-11 text-sm' : 'h-14 text-lg'} font-thai gap-2 hover:bg-muted shadow-sm hover:shadow-md transition-all`}
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
                  {transactions.map((tx, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-border hover:bg-muted/50 transition-colors group"
                    >
                      <td className={`${compact ? 'px-2 py-2 text-xs' : 'px-6 py-5 text-base'} text-muted-foreground group-hover:text-foreground transition-colors`}>
                        {compact ? tx.date.split('/').slice(0, 2).join('/') : tx.date}
                      </td>
                      <td className={`${compact ? 'px-2 py-2 text-xs' : 'px-6 py-5 text-base'} font-semibold`}>
                        {tx.type}
                      </td>
                      <td className={`${compact ? 'px-2 py-2 text-xs' : 'px-6 py-5 text-base'} text-right font-bold text-foreground`}>
                        {tx.amount.toLocaleString()}
                      </td>
                      <td className={`${compact ? 'px-2 py-2' : 'px-6 py-5'} text-center`}>
                        <Badge 
                          variant={tx.status === "สำเร็จ" ? "default" : "secondary"}
                          className={`${compact ? 'px-2 py-0.5 text-xs' : 'px-4 py-1 text-sm'} font-semibold ${
                            tx.status === "สำเร็จ" 
                              ? "bg-success hover:bg-success text-success-foreground" 
                              : "bg-muted hover:bg-muted"
                          }`}
                        >
                          {tx.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Wallet;
