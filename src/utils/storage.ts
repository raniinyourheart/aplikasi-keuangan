import { Transaction, Budget } from '@/types';

export const storage = {
  getTransactions: (): Transaction[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('transactions');
    if (!data) return [];
    return JSON.parse(data).map((t: any) => ({
      ...t,
      date: new Date(t.date)
    }));
  },
  
  setTransactions: (transactions: Transaction[]) => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  },
  
  getBudgets: (): Budget[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('budgets');
    return data ? JSON.parse(data) : [];
  },
  
  setBudgets: (budgets: Budget[]) => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }
};