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

interface MonthlyTransaction {
  month: number;
  expense: number;
  income: number;
}

interface Transaction {
  amount: number;
  category: string;
  date: string;
  description: string;
  id: string;
  type: string;
}

const MonthlyChart = () => {
  const [monthlyTransactions, setMonthlyTransactions] = useState<
    MonthlyTransaction[]
  >([]);

  useEffect(() => {
    const getMonthlyTransactions = () => {
      const transactionsSummary: MonthlyTransaction[] = Array(12)
        .fill(0)
        .map((_, index) => ({
          month: index + 1,
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
        const month = new Date(transaction.date).getMonth() + 1;

        if (transaction.type === "expense") {
          transactionsSummary[month - 1].expense += transaction.amount;
        } else if (transaction.type === "income") {
          transactionsSummary[month - 1].income += transaction.amount;
        }
      });

      setMonthlyTransactions(transactionsSummary);
    };

    getMonthlyTransactions();
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold text-black dark:text-white">
        Aylık Gelir Gider Rapoları
      </h1>
      <BarChart width={900} height={400} data={monthlyTransactions}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          allowDuplicatedCategory={false}
          tickFormatter={(month) =>
            [
              "Ocak",
              "Şubat",
              "Mart",
              "Nisan",
              "Mayıs",
              "Haziran",
              "Temmuz",
              "Ağustos",
              "Eylül",
              "Ekim",
              "Kasım",
              "Aralık",
            ][month - 1]
          }
          interval={0}
        />
        <YAxis
          domain={[5000, 100000]}
          ticks={[
            10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000,
            100000,
          ]}
          tickFormatter={(value) => value.toLocaleString()}
          minTickGap={0}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="expense" fill="#FF6666" name="Gider" />
        <Bar dataKey="income" fill="#66CC99" name="Gelir" />
      </BarChart>
    </>
  );
};

export default MonthlyChart;
