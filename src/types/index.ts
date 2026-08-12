export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: Date;
}

export interface Budget {
  category: string;
  limit: number;
  spent: number;
}