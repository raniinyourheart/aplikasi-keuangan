'use client';

import { useState } from 'react';
import { Transaction } from '@/types';

interface Props {
  onAdd: (transaction: Transaction) => void;
}

export default function TransactionForm({ onAdd }: Props) {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const categories = {
    income: ['Gaji', 'Bonus', 'Investasi', 'Lainnya'],
    expense: ['Makanan', 'Transportasi', 'Belanja', 'Hiburan', 'Tagihan', 'Lainnya']
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !amount) return;

    const transaction: Transaction = {
      id: Date.now().toString(),
      type,
      category,
      amount: parseFloat(amount),
      description: description || category,
      date: new Date()
    };

    onAdd(transaction);
    setAmount('');
    setDescription('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Tambah Transaksi</h2>
      
      <div className="flex gap-4 mb-4">
        <button
          type="button"
          onClick={() => setType('expense')}
          className={`flex-1 py-2 px-4 rounded-lg ${
            type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          Pengeluaran
        </button>
        <button
          type="button"
          onClick={() => setType('income')}
          className={`flex-1 py-2 px-4 rounded-lg ${
            type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          Pemasukan
        </button>
      </div>

      <div className="space-y-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          required
        >
          <option value="">Pilih Kategori</option>
          {categories[type].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Jumlah (Rp)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          required
        />

        <input
          type="text"
          placeholder="Deskripsi (opsional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Tambah Transaksi
        </button>
      </div>
    </form>
  );
}