export interface CartItem {
  id: string;
  number: string;
  amount: number;
  price: number;
}

export interface LotteryType {
  id: string;
  name: string;
  closing: string;
  prize: string;
  status: "open" | "closed";
}

export interface Transaction {
  date: string;
  type: string;
  amount: number;
  status: string;
}
