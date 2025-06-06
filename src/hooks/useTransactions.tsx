import { useEffect, useState } from "react";
import { z } from "zod";

const STORAGE_KEY = "transactions";

// Updated type: 0 for Expense, 1 for Income
export type Transaction = {
  id: string; // Unique ID
  description: string;
  type: 0 | 1; // 0 = Expense, 1 = Income
  amount: number;
  category: string;
  date: string;
  notes?: string;
};

const transactionSchema = z.object({
  description: z.string().min(1, "Description is required"),
  type: z.union([z.literal(0), z.literal(1)]),
  amount: z.number().positive("Amount must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
  currency: z.string().min(1, "Currency is required"),
  notes: z.string().optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([] as Transaction[]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
  }, []);

  const saveToStorage = (data: Transaction[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setTransactions(data);
  };

  const addTransaction = (tx: Transaction) => {
    const updated = [tx, ...transactions];
    saveToStorage(updated);
  };

  const deleteTransaction = (id: string) => {
    const updated = transactions.filter((t) => t.id !== id);
    saveToStorage(updated);
  };

  const updateTransaction = (updatedTx: Transaction) => {
    const updated = transactions.map((t) =>
      t.id === updatedTx.id ? updatedTx : t
    );
    saveToStorage(updated);
  };

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
  };
};

// Optional helper for displaying type in UI
export const getTypeLabel = (type: 0 | 1) =>
  type === 0 ? "Expense" : "Income";
