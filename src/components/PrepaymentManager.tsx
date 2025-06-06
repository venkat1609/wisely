import React, { useState } from "react";

export interface Prepayment {
  id: string;
  amount: number;
  type: "one-time" | "monthly";
  startMonth: number;
  endMonth?: number;
}

interface PrepaymentManagerProps {
  prepayments: Prepayment[];
  onUpdate: (prepayments: Prepayment[]) => void;
}

export function PrepaymentManager({
  prepayments,
  onUpdate,
}: PrepaymentManagerProps) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("one-time");
  const [startMonth, setStartMonth] = useState(1);
  const [endMonth, setEndMonth] = useState(1);

  function addPrepayment() {
    if (!amount || Number(amount) <= 0) return;
    if (type === "monthly" && endMonth < startMonth)
      return alert("End month must be >= start month");

    const newPrepayment: Prepayment = {
      id: crypto.randomUUID(),
      amount: Number(amount),
      type,
      startMonth,
      endMonth: type === "monthly" ? endMonth : undefined,
    };

    onUpdate([...prepayments, newPrepayment]);

    // Reset inputs
    setAmount("");
    setType("one-time");
    setStartMonth(1);
    setEndMonth(1);
  }

  function removePrepayment(id: string) {
    onUpdate(prepayments.filter((p) => p.id !== id));
  }

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">Manage Prepayments</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "one-time" | "monthly")}
          className="border rounded px-3 py-2"
        >
          <option value="one-time">One-Time</option>
          <option value="monthly">Monthly</option>
        </select>
        <input
          type="number"
          min="1"
          max="600"
          placeholder="Start Month"
          value={startMonth}
          onChange={(e) => setStartMonth(Number(e.target.value))}
          className="border rounded px-3 py-2"
        />
        {type === "monthly" && (
          <input
            type="number"
            min={startMonth}
            max="600"
            placeholder="End Month"
            value={endMonth}
            onChange={(e) => setEndMonth(Number(e.target.value))}
            className="border rounded px-3 py-2"
          />
        )}
      </div>

      <button
        onClick={addPrepayment}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Add Prepayment
      </button>

      {prepayments.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Current Prepayments</h3>
          <ul className="divide-y">
            {prepayments.map(({ id, amount, type, startMonth, endMonth }) => (
              <li key={id} className="flex justify-between items-center py-2">
                <span>
                  {type === "one-time" ? "One-Time" : `Monthly`} - ₹
                  {amount.toFixed(2)} from month {startMonth}
                  {type === "monthly" && ` to ${endMonth}`}
                </span>
                <button
                  onClick={() => removePrepayment(id)}
                  className="text-red-600 hover:text-red-800 font-bold"
                  aria-label="Remove prepayment"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
