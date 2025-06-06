import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrencyList } from "../hooks/useCurrencyList.tsx";

// Schema
const transactionSchema = z.object({
  description: z.string().min(1, "Description is required"),
  type: z.union([z.literal(0), z.literal(1)]),
  amount: z.number().positive("Amount must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
  currency: z.string().min(1, "Currency is required"),
  notes: z.string().optional(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface AddTransactionFormProps {
  onSubmit: (data: TransactionFormData) => void;
  defaultValues?: Partial<TransactionFormData>;
}

export function AddTransactionForm({ onSubmit }: AddTransactionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: "",
      type: 0,
      amount: 0,
      category: "",
      currency: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const { currencies, loading } = useCurrencyList();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Description */}
      <div>
        <input
          placeholder="What's this for?"
          type="text"
          {...register("description")}
          className="w-full border-b border-gray-300 dark:border-gray-600 px-2 py-2 bg-transparent focus:outline-none focus:border-blue-500"
        />
        {errors.description && (
          <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Type */}
      <div>
        <select
          {...register("type", { valueAsNumber: true })}
          className="w-full border-b border-gray-300 dark:border-gray-600 px-2 py-2 bg-transparent focus:outline-none focus:border-blue-500"
        >
          <option value={0}>Expense</option>
          <option value={1}>Income</option>
        </select>
      </div>

      {/* Amount */}
      <div>
        <input
          type="number"
          placeholder="Amount"
          step="0.01"
          {...register("amount", { valueAsNumber: true })}
          className="w-full border-b border-gray-300 dark:border-gray-600 px-2 py-2 bg-transparent focus:outline-none focus:border-blue-500"
        />
        {errors.amount && (
          <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <input
          type="text"
          placeholder="Category"
          {...register("category")}
          className="w-full border-b border-gray-300 dark:border-gray-600 px-2 py-2 bg-transparent focus:outline-none focus:border-blue-500"
        />
        {errors.category && (
          <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <input
          type="date"
          {...register("date")}
          className="w-full border-b border-gray-300 dark:border-gray-600 px-2 py-2 bg-transparent focus:outline-none focus:border-blue-500"
        />
        {errors.date && (
          <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>
        )}
      </div>

      {/* Notes */}
      <div>
        <textarea
          {...register("notes")}
          rows={3}
          placeholder="Add notes (optional)"
          className="w-full border-b border-gray-300 dark:border-gray-600 px-2 py-2 bg-transparent focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Currency */}
      <div>
        {loading ? (
          <p className="text-sm text-gray-500">Loading currencies...</p>
        ) : (
          <select
            {...register("currency")}
            className="w-full border-b border-gray-300 dark:border-gray-600 px-2 py-2 bg-transparent focus:outline-none focus:border-blue-500"
          >
            <option value="" hidden>
              Select Currency
            </option>
            {Object.entries(currencies).map(([code]) => {
              let info = currencies[code];
              return (
                <option key={code} value={code}>
                  {code} – {info?.name}
                </option>
              );
            })}
          </select>
        )}
        {errors.currency && (
          <p className="text-sm text-red-500 mt-1">Currency is required.</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Save Transaction
      </button>
    </form>
  );
}
