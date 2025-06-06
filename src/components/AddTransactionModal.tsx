import React from "react";
import { AddTransactionForm } from "./AddTransactionForm.tsx";

function AddTransactionModal({ onClose }) {
  const handleAdd = (data) => {
    // POST to backend or mutate query cache
    console.log("Transaction Data:", data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
        <AddTransactionForm onSubmit={handleAdd} />
        <button className="mt-4 text-sm text-gray-500" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
