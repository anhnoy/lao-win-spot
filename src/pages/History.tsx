import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  History as HistoryIcon, 
  Receipt, 
  Calendar, 
  TrendingDown, 
  TrendingUp, 
  LogIn,
  Ticket,
  Trophy,
  Clock,
  XCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { th } from "date-fns/locale";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  created_at: string;
}

interface LotteryPurchase {
  id: string;
  lottery_type: string;
  number: string;
  amount: number;
  price_per_unit: number;
  total_price: number;
  status: string;
  draw_date: string | null;
  prize_amount: number;
  created_at: string;
}

const History = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [purchases, setPurchases] = useState<LotteryPurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);

      // Fetch both transactions and lottery purchases
      const [transactionsResult, purchasesResult] = await Promise.all([
        supabase
          .from('transactions')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('lottery_purchases')
          .select('*')
          .order('created_at', { ascending: false })
      ]);

      if (transactionsResult.error) {
        console.error('Error fetching transactions:', transactionsResult.error);
      } else {
        setTransactions(transactionsResult.data || []);
      }

      if (purchasesResult.error) {
        console.error('Error fetching purchases:', purchasesResult.error);
      } else {
        setPurchases(purchasesResult.data || []);
      }
      
      setLoading(false);
    };

    checkAuthAndFetchData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setIsLoggedIn(true);
        checkAuthAndFetchData();
      } else {
        setIsLoggedIn(false);
        setTransactions([]);
        setPurchases([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'purchase':
        return 'ซื้อหวย';
      case 'deposit':
        return 'เติมเงิน';
      case 'withdraw':
        return 'ถอนเงิน';
      case 'win':
        return 'ถูกรางวัล';
      default:
        return type;
    }
  };

  const getLotteryTypeLabel = (type: string) => {
    switch (type) {
      case '3-digit':
        return '3 ตัวตรง';
      case '2-digit':
        return '2 ตัวตรง';
      case '1-digit':
        return '1 ตัวตรง';
      case '4-digit':
        return '4 ตัวตรง';
      case '5-digit':
        return '5 ตัวตรง';
      case '6-digit':
        return '6 ตัวตรง';
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success text-success-foreground">สำเร็จ</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-warning/20 text-warning-foreground border-warning">รอผล</Badge>;
      case 'won':
        return <Badge className="bg-success text-success-foreground">ถูกรางวัล</Badge>;
      case 'lost':
        return <Badge variant="outline" className="text-muted-foreground">ไม่ถูกรางวัล</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">ยกเลิก</Badge>;
      case 'failed':
        return <Badge variant="destructive">ไม่สำเร็จ</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPurchaseStatusIcon = (status: string) => {
    switch (status) {
      case 'won':
        return <Trophy className="h-5 w-5 text-success" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-warning" />;
      case 'lost':
        return <XCircle className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Ticket className="h-5 w-5 text-primary" />;
    }
  };

  const getAmountColor = (type: string, amount: number) => {
    if (type === 'deposit' || type === 'win') {
      return 'text-success';
    }
    if (type === 'purchase' || type === 'withdraw') {
      return 'text-destructive';
    }
    return amount >= 0 ? 'text-success' : 'text-destructive';
  };

  const getAmountIcon = (type: string) => {
    if (type === 'deposit' || type === 'win') {
      return <TrendingUp className="h-4 w-4 text-success" />;
    }
    return <TrendingDown className="h-4 w-4 text-destructive" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold font-thai mb-2">ประวัติการซื้อหวย</h1>
            <p className="text-muted-foreground">ดูประวัติรายการทั้งหมดของคุณ</p>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center py-16">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <LogIn className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold font-thai mb-2">กรุณาเข้าสู่ระบบ</h2>
            <p className="text-muted-foreground mb-6">
              เข้าสู่ระบบเพื่อดูประวัติการซื้อหวยของคุณ
            </p>
            <Button 
              className="bg-gradient-primary"
              onClick={() => navigate('/login')}
            >
              เข้าสู่ระบบ
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <HistoryIcon className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold font-thai">ประวัติการซื้อหวย</h1>
          </div>
          <p className="text-muted-foreground">ดูประวัติรายการทั้งหมดของคุณ</p>
        </div>

        <Tabs defaultValue="purchases" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="purchases" className="gap-2">
              <Ticket className="h-4 w-4" />
              หวยที่ซื้อ ({purchases.length})
            </TabsTrigger>
            <TabsTrigger value="transactions" className="gap-2">
              <Receipt className="h-4 w-4" />
              ธุรกรรม ({transactions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="purchases">
            {purchases.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Ticket className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold font-thai mb-2">ยังไม่มีประวัติการซื้อหวย</h3>
                <p className="text-muted-foreground mb-6">เริ่มซื้อหวยเพื่อดูประวัติรายการของคุณ</p>
                <Button 
                  className="bg-gradient-primary"
                  onClick={() => navigate('/buy')}
                >
                  ซื้อหวยเลย
                </Button>
              </Card>
            ) : (
              <div className="space-y-3">
                {purchases.map((purchase) => (
                  <Card key={purchase.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                          purchase.status === 'won' 
                            ? 'bg-success/20' 
                            : purchase.status === 'pending'
                            ? 'bg-warning/20'
                            : 'bg-muted'
                        }`}>
                          {getPurchaseStatusIcon(purchase.status)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-2xl font-mono tracking-wider text-primary">
                              {purchase.number}
                            </span>
                            {getStatusBadge(purchase.status)}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>{getLotteryTypeLabel(purchase.lottery_type)}</span>
                            <span>•</span>
                            <span>{purchase.amount} ใบ</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(purchase.created_at), 'dd MMM yyyy, HH:mm น.', { locale: th })}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold font-mono text-destructive">
                          -{purchase.total_price.toLocaleString()} ฿
                        </div>
                        {purchase.status === 'won' && purchase.prize_amount > 0 && (
                          <div className="text-success font-bold">
                            +{purchase.prize_amount.toLocaleString()} ฿
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="transactions">
            {transactions.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Receipt className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold font-thai mb-2">ยังไม่มีประวัติธุรกรรม</h3>
                <p className="text-muted-foreground mb-6">เริ่มใช้งานเพื่อดูประวัติธุรกรรมของคุณ</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <Card key={transaction.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          {getAmountIcon(transaction.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold font-thai">
                              {getTypeLabel(transaction.type)}
                            </span>
                            {getStatusBadge(transaction.status)}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(transaction.created_at), 'dd MMM yyyy, HH:mm น.', { locale: th })}
                          </div>
                        </div>
                      </div>
                      <div className={`text-lg font-bold font-mono ${getAmountColor(transaction.type, transaction.amount)}`}>
                        {transaction.amount >= 0 ? '+' : ''}{transaction.amount.toLocaleString()} ฿
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default History;