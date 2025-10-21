import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet as WalletIcon, TrendingUp, Download, Upload, History } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface WalletProps {
  balance: number;
}

interface Transaction {
  date: string;
  type: string;
  amount: number;
  status: "สำเร็จ" | "รอดำเนินการ";
}

const Wallet = ({ balance: initialBalance }: WalletProps) => {
  const [balance] = useState(initialBalance);
  const [referral] = useState(50000);

  // ตัวอย่างประวัติธุรกรรม
  const transactions: Transaction[] = [
    { date: "21/10/2025", type: "ฝากเงิน", amount: 500, status: "สำเร็จ" },
    { date: "20/10/2025", type: "ถอนเงิน", amount: 300, status: "รอดำเนินการ" },
    { date: "19/10/2025", type: "แนะนำเพื่อน", amount: 100, status: "สำเร็จ" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold font-thai text-foreground mb-3 tracking-tight">
            กระเป๋าเงิน
          </h1>
          <p className="text-muted-foreground text-lg">จัดการยอดเงินและธุรกรรมของคุณ</p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Main Balance Card */}
          <Card className="relative overflow-hidden border-0 bg-gradient-primary shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                    <WalletIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-primary-foreground/80 text-sm font-medium">ยอดเงิน</p>
                    <p className="text-primary-foreground/80 text-sm">รวม</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-6xl font-extrabold text-primary-foreground tracking-tight">
                  {balance.toLocaleString()}
                </p>
                <p className="text-2xl font-bold text-primary-foreground/90">฿</p>
              </div>
            </CardContent>
          </Card>

          {/* Referral Balance Card */}
          <Card className="relative overflow-hidden border-0 bg-gradient-gold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full -ml-12 -mb-12" />
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-black/10 rounded-full backdrop-blur-sm">
                    <TrendingUp className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-accent-foreground/80 text-sm font-medium">เงินจาก</p>
                    <p className="text-accent-foreground/80 text-sm">แนะนำเพื่อน</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-6xl font-extrabold text-accent-foreground tracking-tight">
                  {referral.toLocaleString()}
                </p>
                <p className="text-2xl font-bold text-accent-foreground/90">฿</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card className="max-w-5xl mx-auto shadow-md hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-8">
            <h2 className="text-xl font-bold font-thai mb-6">ดำเนินการ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button 
                size="lg" 
                className="h-14 text-lg font-thai gap-3 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
              >
                <Download className="w-5 h-5" />
                ฝากเงิน
              </Button>
              <Button 
                size="lg" 
                variant="destructive" 
                className="h-14 text-lg font-thai gap-3 shadow-md hover:shadow-lg transition-all"
              >
                <Upload className="w-5 h-5" />
                ถอนเงิน
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 text-lg font-thai gap-3 hover:bg-muted shadow-sm hover:shadow-md transition-all"
              >
                <History className="w-5 h-5" />
                ประวัติธุรกรรม
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="max-w-5xl mx-auto shadow-md hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-8">
            <h2 className="text-xl font-bold font-thai mb-6">ธุรกรรมล่าสุด</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="px-6 py-4 text-left text-base font-bold text-foreground">วันที่</th>
                    <th className="px-6 py-4 text-left text-base font-bold text-foreground">ประเภท</th>
                    <th className="px-6 py-4 text-right text-base font-bold text-foreground">จำนวนเงิน</th>
                    <th className="px-6 py-4 text-center text-base font-bold text-foreground">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-border hover:bg-muted/50 transition-colors group"
                    >
                      <td className="px-6 py-5 text-base text-muted-foreground group-hover:text-foreground transition-colors">
                        {tx.date}
                      </td>
                      <td className="px-6 py-5 text-base font-semibold">
                        {tx.type}
                      </td>
                      <td className="px-6 py-5 text-base text-right font-bold text-foreground">
                        {tx.amount.toLocaleString()} ฿
                      </td>
                      <td className="px-6 py-5 text-center">
                        <Badge 
                          variant={tx.status === "สำเร็จ" ? "default" : "secondary"}
                          className={`px-4 py-1 text-sm font-semibold ${
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
