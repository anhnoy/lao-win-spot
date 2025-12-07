-- Create lottery_purchases table
CREATE TABLE public.lottery_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lottery_type TEXT NOT NULL,
  number TEXT NOT NULL,
  amount INTEGER NOT NULL DEFAULT 1,
  price_per_unit NUMERIC NOT NULL,
  total_price NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  draw_date DATE,
  result TEXT,
  prize_amount NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add constraint for status values
ALTER TABLE public.lottery_purchases 
ADD CONSTRAINT lottery_purchases_status_check 
CHECK (status IN ('pending', 'won', 'lost', 'cancelled'));

-- Enable RLS
ALTER TABLE public.lottery_purchases ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only see their own purchases
CREATE POLICY "Users can view their own purchases"
ON public.lottery_purchases
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own purchases
CREATE POLICY "Users can insert their own purchases"
ON public.lottery_purchases
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users cannot update/delete purchases (only admin can via service role)

-- Create trigger for updated_at
CREATE TRIGGER update_lottery_purchases_updated_at
BEFORE UPDATE ON public.lottery_purchases
FOR EACH ROW
EXECUTE FUNCTION public.update_wallet_updated_at();

-- Create index for better query performance
CREATE INDEX idx_lottery_purchases_user_id ON public.lottery_purchases(user_id);
CREATE INDEX idx_lottery_purchases_status ON public.lottery_purchases(status);
CREATE INDEX idx_lottery_purchases_draw_date ON public.lottery_purchases(draw_date);