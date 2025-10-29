import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface WalletData {
  balance: number;
  referral_balance: number;
}

export interface TransactionData {
  id: string;
  type: string;
  amount: number;
  status: string;
  created_at: string;
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchWallet = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('wallets')
        .select('balance, referral_balance')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setWallet(data);
    } catch (error) {
      console.error('Error fetching wallet:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const deposit = async (amount: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Create transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'deposit',
          amount,
          status: 'completed'
        });

      if (transactionError) throw transactionError;

      // Update wallet balance
      const { error: walletError } = await supabase
        .from('wallets')
        .update({
          balance: (wallet?.balance || 0) + amount
        })
        .eq('user_id', user.id);

      if (walletError) throw walletError;

      toast({
        title: 'ฝากเงินสำเร็จ',
        description: `ฝากเงิน ${amount.toFixed(2)} บาท เรียบร้อยแล้ว`,
      });

      await fetchWallet();
      await fetchTransactions();
    } catch (error) {
      console.error('Error depositing:', error);
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถฝากเงินได้ กรุณาลองใหม่อีกครั้ง',
        variant: 'destructive',
      });
    }
  };

  const withdraw = async (amount: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      if ((wallet?.balance || 0) < amount) {
        toast({
          title: 'ยอดเงินไม่เพียงพอ',
          description: 'ยอดเงินในกระเป๋าของคุณไม่เพียงพอสำหรับการถอน',
          variant: 'destructive',
        });
        return;
      }

      // Create transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'withdrawal',
          amount,
          status: 'completed'
        });

      if (transactionError) throw transactionError;

      // Update wallet balance
      const { error: walletError } = await supabase
        .from('wallets')
        .update({
          balance: (wallet?.balance || 0) - amount
        })
        .eq('user_id', user.id);

      if (walletError) throw walletError;

      toast({
        title: 'ถอนเงินสำเร็จ',
        description: `ถอนเงิน ${amount.toFixed(2)} บาท เรียบร้อยแล้ว`,
      });

      await fetchWallet();
      await fetchTransactions();
    } catch (error) {
      console.error('Error withdrawing:', error);
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถถอนเงินได้ กรุณาลองใหม่อีกครั้ง',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchWallet();
    fetchTransactions();
  }, []);

  return {
    wallet,
    transactions,
    loading,
    deposit,
    withdraw,
    refresh: () => {
      fetchWallet();
      fetchTransactions();
    }
  };
};
