import React from "react";

interface ReportToggleProps {
  reportMode: "monthly" | "yearly";
  viewMode: "table" | "chart";
  onReportChange: (mode: "monthly" | "yearly") => void;
  onViewChange: (view: "table" | "chart") => void;
}

export function ReportToggle({
  reportMode,
  viewMode,
  onReportChange,
  onViewChange,
}: ReportToggleProps) {
  return (
    <div className="flex items-center justify-between max-w-md mx-auto space-x-4 my-4">
      <select
        className="border rounded px-3 py-2"
        value={reportMode}
        onChange={(e) => onReportChange(e.target.value as "monthly" | "yearly")}
      >
        <option value="monthly">Monthly Report</option>
        <option value="yearly">Yearly Report</option>
      </select>

      <select
        className="border rounded px-3 py-2"
        value={viewMode}
        onChange={(e) => onViewChange(e.target.value as "table" | "chart")}
      >
        <option value="table">Table View</option>
        <option value="chart">Chart View</option>
      </select>
    </div>
  );
}
