// pages/goal-payments.tsx
import React, { useState } from "react";

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  targetDate: string;
  payments: Payment[];
}

interface Payment {
  id: string;
  amount: number;
  date: string;
  note?: string;
}

const generateId = () => Math.random().toString(36).substring(2, 10);

export default function GoalPaymentsPage() {
  const [goal, setGoal] = useState({
    id: generateId(),
    name: "Buy a Car",
    targetAmount: 800000,
    targetDate: "2026-12-31",
    payments: [],
  });

  const [paymentInput, setPaymentInput] = useState({
    amount: "",
    date: "",
    note: "",
  });

  const addPayment = () => {
    if (!paymentInput.amount || !paymentInput.date) return;

    const newPayment: Payment = {
      id: generateId(),
      amount: parseFloat(paymentInput.amount),
      date: paymentInput.date,
      note: paymentInput.note,
    };

    setGoal((prev) => ({
      ...prev,
      payments: [...prev.payments, newPayment],
    }));

    setPaymentInput({ amount: "", date: "", note: "" });
  };

  const totalPaid = goal.payments.reduce((sum, p) => sum + p.amount, 0);
  const remaining = goal.targetAmount - totalPaid;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Goal: {goal.name}</h1>

      <div className="mb-6">
        <p>
          <strong>Target Amount:</strong> ₹{goal.targetAmount.toLocaleString()}
        </p>
        <p>
          <strong>Target Date:</strong> {goal.targetDate}
        </p>
        <p>
          <strong>Total Paid:</strong> ₹{totalPaid.toLocaleString()}
        </p>
        <p>
          <strong>Remaining:</strong> ₹{remaining.toLocaleString()}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Add New Payment</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <input
            type="number"
            placeholder="Amount (₹)"
            value={paymentInput.amount}
            onChange={(e) =>
              setPaymentInput({ ...paymentInput, amount: e.target.value })
            }
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="date"
            value={paymentInput.date}
            onChange={(e) =>
              setPaymentInput({ ...paymentInput, date: e.target.value })
            }
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="text"
            placeholder="Note (optional)"
            value={paymentInput.note}
            onChange={(e) =>
              setPaymentInput({ ...paymentInput, note: e.target.value })
            }
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <button
          onClick={addPayment}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Payment
        </button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Payment History</h2>
        {goal.payments.length === 0 ? (
          <p>No payments yet.</p>
        ) : (
          <table className="table-auto w-full border mt-2">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-3 py-2">Date</th>
                <th className="border px-3 py-2">Amount (₹)</th>
                <th className="border px-3 py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {goal.payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="border px-3 py-2">{payment.date}</td>
                  <td className="border px-3 py-2">
                    {payment.amount.toLocaleString()}
                  </td>
                  <td className="border px-3 py-2">{payment.note || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
