// hooks/useCurrencyList.ts
import { useEffect, useState } from "react";

export type CurrencyInfo = {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
  type: string;
};

type CurrencyApiResponse = {
  data: Record<string, CurrencyInfo>;
};

type CurrencyMap = Record<string, CurrencyInfo>;

const mockCurrencies: CurrencyMap = {
  USD: {
    symbol: "$",
    name: "US Dollar",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "USD",
    name_plural: "US dollars",
    type: "fiat",
  },
  INR: {
    symbol: "₹",
    name: "Indian Rupee",
    symbol_native: "₹",
    decimal_digits: 2,
    rounding: 0,
    code: "INR",
    name_plural: "Indian rupees",
    type: "fiat",
  },
  AED: {
    symbol: "د.إ",
    name: "United Arab Emirates Dirham",
    symbol_native: "د.إ",
    decimal_digits: 2,
    rounding: 0,
    code: "AED",
    name_plural: "UAE dirhams",
    type: "fiat",
  },
};

export const useCurrencyList = () => {
  const [currencies, setCurrencies] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async behavior
    const timeout = setTimeout(() => {
      setCurrencies(mockCurrencies);
      setLoading(false);
    }, 500); // Simulate a short delay

    return () => clearTimeout(timeout);
  }, []);

  return { currencies, loading };
};
