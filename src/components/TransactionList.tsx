'use client';

import { Transaction } from '@/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function TransactionList({ transactions, onDelete }: Props) {
  const sortedTransactions = [...transactions].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Riwayat Transaksi</h2>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sortedTransactions.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">Belum ada transaksi</p>
        ) : (
          sortedTransactions.map(transaction => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium px-2 py-1 rounded ${
                    transaction.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}
                  </span>
                  <span className="font-medium">{transaction.category}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {format(transaction.date, 'dd MMM yyyy', { locale: id })}
                  </span>
                </div>
                {transaction.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {transaction.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-bold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  Rp {transaction.amount.toLocaleString('id-ID')}
                </span>
                <button
                  onClick={() => onDelete(transaction.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}