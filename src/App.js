import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Transactions from './pages/Transactions.tsx';
import LoanCalculatorPage from './pages/loan-calculator.tsx';
import Goals from './pages/Goals.tsx';
import Home from './pages/Home/index.tsx';
import Login from './pages/Login/index.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="transactions" element={<Transactions />} />
        <Route path="loan-calculator" element={<LoanCalculatorPage />} />
        <Route path="goals" element={<Goals />} />
        <Route path="login" element={<Login />} />
        <Route path="/" exact element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
