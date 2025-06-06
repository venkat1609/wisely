import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

interface LoanInputData {
  loanAmount: number;
  interestRate: number; // annual %
  tenureMonths: number;
  emiAmount: number; // calculated EMI amount
}

interface Prepayment {
  month: number; // prepayment month number (1-based)
  amount: number; // prepayment amount
}

interface ScheduleEntry {
  month: number;
  year: number;
  emi: number;
  interest: number;
  principal: number;
  prepayment: number;
  balance: number;
}

interface AmortizationReportProps {
  loanData: LoanInputData;
  prepayments: Prepayment[];
  reportMode: "monthly" | "yearly";
  viewMode: "table" | "chart";
}

/**
 * Simple amortization schedule generator with prepayments applied monthly.
 */
function generateSchedule(
  loanData: LoanInputData,
  prepayments: Prepayment[]
): ScheduleEntry[] {
  const schedule: ScheduleEntry[] = [];
  let balance = loanData.loanAmount;
  const monthlyRate = loanData.interestRate / 100 / 12;
  let month = 1;

  while (balance > 0 && month <= loanData.tenureMonths) {
    const interest = balance * monthlyRate;
    const emi = Math.min(loanData.emiAmount, balance + interest);
    const principal = emi - interest;

    const prepayment = prepayments
      .filter((p) => p.month === month)
      .reduce((acc, curr) => acc + curr.amount, 0);

    balance = balance - principal - prepayment;
    if (balance < 0) balance = 0;

    schedule.push({
      month,
      year: Math.ceil(month / 12),
      emi,
      interest,
      principal,
      prepayment,
      balance,
    });

    month++;
  }

  return schedule;
}

/**
 * Aggregates monthly schedule entries into yearly summaries.
 */
function aggregateYearly(schedule: ScheduleEntry[]): ScheduleEntry[] {
  const yearlyMap = new Map<
    number,
    {
      emi: number;
      interest: number;
      principal: number;
      prepayment: number;
      balance: number;
    }
  >();

  schedule.forEach(
    ({ year, emi, interest, principal, prepayment, balance }) => {
      const existing = yearlyMap.get(year);
      if (existing) {
        yearlyMap.set(year, {
          emi: existing.emi + emi,
          interest: existing.interest + interest,
          principal: existing.principal + principal,
          prepayment: existing.prepayment + prepayment,
          balance,
        });
      } else {
        yearlyMap.set(year, { emi, interest, principal, prepayment, balance });
      }
    }
  );

  // Convert map to array sorted by year
  return Array.from(yearlyMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([year, data]) => ({
      month: 0,
      year,
      emi: data.emi,
      interest: data.interest,
      principal: data.principal,
      prepayment: data.prepayment,
      balance: data.balance,
    }));
}

export function AmortizationReport({
  loanData,
  prepayments,
  reportMode,
  viewMode,
}: AmortizationReportProps) {
  const schedule = useMemo(
    () => generateSchedule(loanData, prepayments),
    [loanData, prepayments]
  );

  const reportData =
    reportMode === "monthly" ? schedule : aggregateYearly(schedule);

  if (viewMode === "table") {
    return (
      <div className="overflow-x-auto p-4 bg-white rounded shadow max-w-6xl mx-auto mt-6">
        <h2 className="text-xl font-semibold mb-4">
          Amortization Schedule Table ({reportMode})
        </h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              {reportMode === "monthly" && (
                <th className="border border-gray-300 px-2 py-1">Month</th>
              )}
              {reportMode === "yearly" && (
                <th className="border border-gray-300 px-2 py-1">Year</th>
              )}
              <th className="border border-gray-300 px-2 py-1">EMI (₹)</th>
              <th className="border border-gray-300 px-2 py-1">Interest (₹)</th>
              <th className="border border-gray-300 px-2 py-1">
                Principal (₹)
              </th>
              <th className="border border-gray-300 px-2 py-1">
                Prepayment (₹)
              </th>
              <th className="border border-gray-300 px-2 py-1">Balance (₹)</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map(
              ({
                month,
                year,
                emi,
                interest,
                principal,
                prepayment,
                balance,
              }) => (
                <tr key={`${year}-${month}`} className="text-center">
                  {reportMode === "monthly" && (
                    <td className="border border-gray-300 px-2 py-1">
                      {month}
                    </td>
                  )}
                  {reportMode === "yearly" && (
                    <td className="border border-gray-300 px-2 py-1">{year}</td>
                  )}
                  <td className="border border-gray-300 px-2 py-1">
                    {emi.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {interest.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {principal.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {prepayment.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {balance.toFixed(2)}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  }

  // Chart view:
  const labels = reportData.map(({ month, year }) =>
    reportMode === "monthly" ? `M${month}` : `Y${year}`
  );

  const interestData = reportData.map((d) => d.interest);
  const principalData = reportData.map((d) => d.principal);
  const prepaymentData = reportData.map((d) => d.prepayment);
  const balanceData = reportData.map((d) => d.balance);

  const data: ChartData<"bar" | "line"> = {
    labels,
    datasets: [
      {
        label: "Interest",
        data: interestData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        stack: "Stack 0",
        type: "bar",
      },
      {
        label: "Principal",
        data: principalData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        stack: "Stack 0",
        type: "bar",
      },
      {
        label: "Prepayment",
        data: prepaymentData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        stack: "Stack 0",
        type: "bar",
      },
      {
        label: "Balance",
        data: balanceData,
        type: "line",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 2,
        fill: false,
        yAxisID: "y1",
      },
    ],
  };

  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (₹)",
        },
      },
      y1: {
        type: "linear",
        position: "right",
        beginAtZero: true,
        title: {
          display: true,
          text: "Balance (₹)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Amortization Schedule Chart ({reportMode})
      </h2>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
}
