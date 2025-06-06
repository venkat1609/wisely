import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type GoalStatus = "active" | "completed" | "cancelled";
type Recurrence = "monthly" | "quarterly" | "yearly";

interface Goal {
  id: string;
  title: string;
  description?: string;
  amount: number;
  paid_amount: number;
  created_date: string;
  target_date: string;
  currency: string;
  is_recurring?: boolean;
  recurrence_type?: Recurrence;
  category?: string;
  notes?: string;
  status?: GoalStatus;
}

const defaultGoal: Partial<Goal> = {
  title: "",
  description: "",
  amount: 0,
  paid_amount: 0,
  created_date: new Date().toISOString().split("T")[0],
  target_date: "",
  currency: "INR",
  is_recurring: false,
  recurrence_type: undefined,
  category: "",
  notes: "",
  status: "active",
};

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState(defaultGoal);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("goals");
    if (stored) {
      setGoals(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.target_date || !form.currency)
      return;

    if (editingId) {
      setGoals((prev) =>
        prev.map((goal) =>
          goal.id === editingId ? ({ ...goal, ...form } as Goal) : goal
        )
      );
      setEditingId(null);
    } else {
      const newGoal: Goal = {
        ...(form as Goal),
        id: uuidv4(),
        amount: Number(form.amount),
        paid_amount: Number(form.paid_amount ?? 0),
        created_date: new Date().toISOString().split("T")[0],
      };
      setGoals((prev) => [...prev, newGoal]);
    }

    setForm(defaultGoal);
  };

  const handleEdit = (id: string) => {
    const goal = goals.find((g) => g.id === id);
    if (goal) {
      setForm(goal);
      setEditingId(id);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      setGoals((prev) => prev.filter((goal) => goal.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎯 Goals Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-lg mb-10 space-y-4"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="title"
            value={form.title ?? ""}
            onChange={handleChange}
            placeholder="Title"
            className="input"
          />
          
          <input
            name="target_date"
            value={form.target_date ?? ""}
            onChange={handleChange}
            type="date"
            className="input"
          />
          <input
            name="amount"
            value={form.amount ?? ""}
            onChange={handleChange}
            placeholder="Amount"
            type="number"
            className="input"
          />
    
          <input
            name="currency"
            value={form.currency ?? ""}
            onChange={handleChange}
            placeholder="Currency (e.g., INR)"
            className="input"
          />
          <input
            name="category"
            value={form.category ?? ""}
            onChange={handleChange}
            placeholder="Category (e.g., Loan)"
            className="input"
          />
        </div>

        <textarea
          name="description"
          value={form.description ?? ""}
          onChange={handleChange}
          placeholder="Description"
          className="input w-full"
        />
        <textarea
          name="notes"
          value={form.notes ?? ""}
          onChange={handleChange}
          placeholder="Notes"
          className="input w-full"
        />

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="is_recurring"
              checked={form.is_recurring ?? false}
              onChange={handleChange}
            />
            <span>Recurring?</span>
          </label>
          {form.is_recurring && (
            <select
              name="recurrence_type"
              value={form.recurrence_type ?? ""}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Recurrence</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          )}
          <select
            name="status"
            value={form.status ?? "active"}
            onChange={handleChange}
            className="input"
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          {editingId ? "Update Goal" : "Add Goal"}
        </button>
      </form>

      <div className="overflow-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2">Title</th>
              <th>Amount</th>
              <th>Paid</th>
              <th>Target</th>
              <th>Status</th>
              <th>Recurring</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((goal) => (
              <tr key={goal.id} className="border-t">
                <td className="px-4 py-2">{goal.title}</td>
                <td>{goal.amount}</td>
                <td>{goal.paid_amount}</td>
                <td>{goal.target_date}</td>
                <td>{goal.status}</td>
                <td>{goal.is_recurring ? goal.recurrence_type : "No"}</td>
                <td className="space-x-2">
                  <button
                    className="text-blue-600"
                    onClick={() => handleEdit(goal.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(goal.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {goals.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No goals yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GoalsPage;
