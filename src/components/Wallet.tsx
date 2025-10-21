import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet as WalletIcon, TrendingUp, Download, Upload, History } from "lucide-react";

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
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-thai text-foreground mb-2">กระเป๋าเงิน</h1>
        <p className="text-muted-foreground">จัดการยอดเงินและธุรกรรมของคุณ</p>
      </div>

      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-primary border-0 shadow-lg hover:shadow-xl transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-thai text-primary-foreground flex items-center gap-2">
              <WalletIcon className="w-5 h-5" />
              ยอดเงินรวม
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-extrabold text-primary-foreground">
              {balance.toLocaleString()} ฿
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-gold border-0 shadow-lg hover:shadow-xl transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-thai text-accent-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              เงินจากแนะนำเพื่อน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-extrabold text-accent-foreground">
              {referral.toLocaleString()} ฿
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="font-thai">ดำเนินการ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button className="flex items-center gap-2" variant="default">
              <Download className="w-4 h-4" />
              ฝากเงิน
            </Button>
            <Button className="flex items-center gap-2" variant="destructive">
              <Upload className="w-4 h-4" />
              ถอนเงิน
            </Button>
            <Button className="flex items-center gap-2" variant="outline">
              <History className="w-4 h-4" />
              ประวัติธุรกรรม
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="font-thai">ธุรกรรมล่าสุด</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">วันที่</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">ประเภท</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">จำนวนเงิน</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-muted-foreground">{tx.date}</td>
                    <td className="px-4 py-3 text-sm font-medium">{tx.type}</td>
                    <td className="px-4 py-3 text-sm text-right font-semibold">
                      {tx.amount.toLocaleString()} ฿
                    </td>
                    <td className="px-4 py-3">
                      <Badge 
                        variant={tx.status === "สำเร็จ" ? "default" : "secondary"}
                        className={tx.status === "สำเร็จ" ? "bg-success text-success-foreground" : ""}
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
  );
};

export default Wallet;
