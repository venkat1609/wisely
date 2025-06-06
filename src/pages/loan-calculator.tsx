// LoanPlannerPage.tsx (React + TailwindCSS)
import React, { useState } from "react";
import { LoanInputForm } from "../components/LoanInputForm.tsx";
import { PrepaymentManager } from "../components/PrepaymentManager.tsx";
import { ReportToggle } from "../components/ReportToggle.tsx";
import { AmortizationReport } from "../components/AmortizationReport.tsx";

export default function LoanPlannerPage() {
  const [loanData, setLoanData] = useState(null);
  const [prepayments, setPrepayments] = useState([]);
  const [reportMode, setReportMode] = useState("monthly");
  const [viewMode, setViewMode] = useState("table");

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-center">Smart Loan EMI Planner</h1>

      <LoanInputForm onSubmit={setLoanData} />

      <PrepaymentManager prepayments={prepayments} onUpdate={setPrepayments} />

      <ReportToggle
        reportMode={reportMode}
        viewMode={viewMode}
        onReportChange={setReportMode}
        onViewChange={setViewMode}
      />

      {loanData && (
        <AmortizationReport
          loanData={loanData}
          prepayments={prepayments}
          reportMode={reportMode}
          viewMode={viewMode}
        />
      )}
    </div>
  );
}
