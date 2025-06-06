import React, { useState } from "react";
import { AddTransactionForm } from "../components/AddTransactionForm.tsx";
import {
  useTransactions,
  getTypeLabel,
  TransactionFormData,
} from "../hooks/useTransactions.tsx";
import { v4 as uuidv4 } from "uuid";

export default function TransactionsPage() {
  const [showModal, setShowModal] = useState(false);
  const { transactions, addTransaction, deleteTransaction } = useTransactions();

  const handleAddTransaction = (data: TransactionFormData) => {
    const parsedType = data.type === 1 ? 1 : 0;

    addTransaction({
      ...data,
      type: parsedType,
      id: uuidv4(),
    });

    setShowModal(false);
  };

  return (
    <div className="min-h-screen p-6 mx-auto bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md max-w-[1000px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Transactions</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Transaction
        </button>
      </div>

      {/* Transactions List */}
      <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {transactions.map((tx) => (
              <li
                key={tx.id}
                className="py-2 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{tx.notes}</p>
                  <p className="text-sm text-gray-500">
                    {getTypeLabel(tx.type)} • {tx.date}
                  </p>
                  {tx.category && (
                    <p className="text-xs text-gray-400 italic">{tx.category}</p>
                  )}
                </div>
                <div className="flex gap-4 items-center">
                  <span
                    className={`font-bold ${
                      tx.type === 1 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.currency} {tx.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => deleteTransaction(tx.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Transaction Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md relative shadow-lg animate-fadeIn">
            <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
            <AddTransactionForm onSubmit={handleAddTransaction} />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
