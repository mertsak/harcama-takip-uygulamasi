"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

// Yıllık işlem türlerini tanımlıyoruz
interface YearlyTransaction {
  year: number;
  expense: number;
  income: number;
}

// Transaction nesnesinin türünü tanımlıyoruz
interface Transaction {
  amount: number;
  category: string;
  date: string;
  description: string;
  id: string;
  type: string; // "expense" veya "income" olabilir
}

const YearlyReport = () => {
  const [yearlyTransactions, setYearlyTransactions] = useState<
    YearlyTransaction[]
  >([]);

  useEffect(() => {
    const getYearlyTransactions = () => {
      const currentYear = new Date().getFullYear();
      const yearsSummary: YearlyTransaction[] = Array(5)
        .fill(0)
        .map((_, index) => ({
          year: currentYear - 4 + index,
          expense: 0,
          income: 0,
        }));

      const transactionStateString = localStorage.getItem("transactionState");
      let transactions: Transaction[] = [];

      try {
        const parsedState = transactionStateString
          ? JSON.parse(transactionStateString)
          : null;

        if (parsedState && Array.isArray(parsedState.transactions)) {
          transactions = parsedState.transactions;
        } else {
          console.warn("transactions verisi beklenen formatta değil.");
        }
      } catch (error) {
        console.error("JSON parse hatası:", error);
      }

      transactions.forEach((transaction) => {
        const year = new Date(transaction.date).getFullYear();
        const yearIndex = yearsSummary.findIndex((y) => y.year === year);

        if (yearIndex >= 0) {
          if (transaction.type === "expense") {
            yearsSummary[yearIndex].expense += transaction.amount;
          } else if (transaction.type === "income") {
            yearsSummary[yearIndex].income += transaction.amount;
          }
        }
      });

      setYearlyTransactions(yearsSummary);
    };

    getYearlyTransactions();
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold text-black dark:text-white ">
        Yıllık Gelir-Gider Raporu (Son 5 Yıl)
      </h1>
      <BarChart width={600} height={400} data={yearlyTransactions}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis
          domain={[25000, 100000]}
          tickFormatter={(value) => value.toLocaleString()} // Virgülle ayırma gibi özel bir biçimlendirme
          minTickGap={0} // Etiketleri daha yakın yerleştirmek için
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="expense" fill="#FF6666" name="Gider" />
        <Bar dataKey="income" fill="#66CC99" name="Gelir" />
      </BarChart>
    </>
  );
};

export default YearlyReport;
