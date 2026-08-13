'use client';

import { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { Transaction } from '..//types';
import { storage } from '../utils/storage';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const saved = storage.getTransactions();
    setTransactions(saved);
  }, []);

  useEffect(() => {
    // Update total setiap kali transactions berubah
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    setTotalIncome(income);
    setTotalExpense(expense);
    setBalance(income - expense);
  }, [transactions]);

  const handleAddTransaction = (transaction: Transaction) => {
    const updated = [...transactions, transaction];
    setTransactions(updated);
    storage.setTransactions(updated);
  };

  const handleDeleteTransaction = (id: string) => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    storage.setTransactions(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          💰 Aplikasi Keuangan
        </h1>

        {/* Ringkasan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Saldo</p>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              Rp {balance.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Pemasukan</p>
            <p className="text-2xl font-bold text-green-600">
              Rp {totalIncome.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Pengeluaran</p>
            <p className="text-2xl font-bold text-red-600">
              Rp {totalExpense.toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        {/* Form dan List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TransactionForm onAdd={handleAddTransaction} />
          <TransactionList 
            transactions={transactions} 
            onDelete={handleDeleteTransaction} 
          />
        </div>
      </div>
    </div>
  );
}