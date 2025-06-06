import React from "react";
import { useForm } from "react-hook-form";

export interface LoanInputData {
  principal: number;
  interestRate: number;
  tenureMonths: number;
  startDate: string;
  reduceEMI: boolean; // false means reduce tenure
}

interface LoanInputFormProps {
  onSubmit: (data: LoanInputData) => void;
}

export function LoanInputForm({ onSubmit }: LoanInputFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoanInputData>({
    defaultValues: {
      principal: 1000000,
      interestRate: 7.5,
      tenureMonths: 60,
      startDate: new Date().toISOString().split("T")[0],
      reduceEMI: false,
    },
  });

  const reduceEMI = watch("reduceEMI");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">Loan Details</h2>

      <div>
        <label className="block font-medium">Principal Amount</label>
        <input
          type="number"
          step="1000"
          min="1"
          {...register("principal", { required: true, min: 1 })}
          className="mt-1 w-full border px-3 py-2 rounded"
        />
        {errors.principal && (
          <p className="text-red-600 text-sm">Please enter principal amount</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Interest Rate (Annual %)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          {...register("interestRate", { required: true, min: 0 })}
          className="mt-1 w-full border px-3 py-2 rounded"
        />
        {errors.interestRate && (
          <p className="text-red-600 text-sm">
            Please enter valid interest rate
          </p>
        )}
      </div>

      <div>
        <label className="block font-medium">Tenure (Months)</label>
        <input
          type="number"
          min="1"
          {...register("tenureMonths", { required: true, min: 1 })}
          className="mt-1 w-full border px-3 py-2 rounded"
        />
        {errors.tenureMonths && (
          <p className="text-red-600 text-sm">Please enter tenure in months</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Loan Start Date</label>
        <input
          type="date"
          {...register("startDate", { required: true })}
          className="mt-1 w-full border px-3 py-2 rounded"
        />
        {errors.startDate && (
          <p className="text-red-600 text-sm">Please select start date</p>
        )}
      </div>

      <div className="flex items-center gap-4 mt-2">
        <input
          type="checkbox"
          id="reduceEMI"
          {...register("reduceEMI")}
          className="w-5 h-5"
        />
        <label htmlFor="reduceEMI" className="select-none">
          Reduce EMI (unchecked = reduce tenure)
        </label>
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Calculate Schedule
      </button>
    </form>
  );
}
