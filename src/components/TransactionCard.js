import { cn } from "../lib/utils";

export default function TransactionCard({ transaction }) {
  const { name, amount, date, category, status } = transaction;

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-900 shadow-md rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition">
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{category} · {date}</p>
      </div>
      <div className="text-right">
        <p
          className={cn(
            "font-semibold text-lg",
            amount < 0 ? "text-red-500" : "text-green-500"
          )}
        >
          {amount < 0 ? "-" : "+"}${Math.abs(amount).toFixed(2)}
        </p>
        <span
          className={cn(
            "text-xs rounded-full px-2 py-0.5 ml-2",
            status === "success"
              ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
              : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
          )}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
