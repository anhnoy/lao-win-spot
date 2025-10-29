-- Create wallets table
CREATE TABLE public.wallets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  referral_balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT balance_non_negative CHECK (balance >= 0),
  CONSTRAINT referral_balance_non_negative CHECK (referral_balance >= 0)
);

-- Enable Row Level Security
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

-- Create policies for wallets
CREATE POLICY "Users can view their own wallet"
ON public.wallets
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own wallet"
ON public.wallets
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own wallet"
ON public.wallets
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create transactions table
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT valid_transaction_type CHECK (type IN ('deposit', 'withdrawal', 'purchase', 'refund', 'referral')),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'completed', 'failed', 'cancelled'))
);

-- Enable Row Level Security
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for transactions
CREATE POLICY "Users can view their own transactions"
ON public.transactions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own transactions"
ON public.transactions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create function to update wallet updated_at
CREATE OR REPLACE FUNCTION public.update_wallet_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_wallets_updated_at
BEFORE UPDATE ON public.wallets
FOR EACH ROW
EXECUTE FUNCTION public.update_wallet_updated_at();

-- Create function to handle new user wallet creation
CREATE OR REPLACE FUNCTION public.handle_new_user_wallet()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.wallets (user_id, balance, referral_balance)
  VALUES (NEW.id, 0.00, 0.00);
  RETURN NEW;
END;
$$;

-- Create trigger to create wallet for new users
CREATE TRIGGER on_auth_user_created_wallet
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_wallet();