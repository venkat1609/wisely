import React from "react";
import {
  FaChartBar,
  FaMoneyBillWave,
  FaBullseye,
  FaCalculator,
  FaSyncAlt,
  FaBrain,
} from "react-icons/fa";
import "./index.css";

const features = [
  {
    icon: <FaChartBar />,
    title: "Smart Dashboard",
    description: "Visualize income, expenses, loans & investments",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Expense Tracking",
    description: "Categorize & analyze your daily spend",
  },
  {
    icon: <FaBullseye />,
    title: "Financial Goals",
    description: "Save for what matters, track your progress",
  },
  {
    icon: <FaCalculator />,
    title: "Loan & EMI Calculator",
    description: "With prepayments, EMI/tenure toggle",
  },
  {
    icon: <FaSyncAlt />,
    title: "Recurring Transactions",
    description: "Subscriptions, premiums, & recurring goals",
  },
  {
    icon: <FaBrain />,
    title: "Insights & Reports",
    description: "Monthly/Yearly summaries & recommendations",
  },
];

const Features = () => {
  return (
    <section className="features-container">
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
