"use client";
import React, { useState } from "react";
import TransactionModal from "@/components/income-expense/TransactionModal";
import TransactionList from "@/components/income-expense/TransactionList";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { addTransaction } from "@/redux/transactionSlice";

interface Transaction {
  id: string;
  type: "income" | "expense";
  description: string;
  amount: number;
  date: string;
  category: string;
}

const IncomeExpensePage = () => {
  const dispatch = useDispatch();
  const budget = useSelector((state: RootState) => state.transactions.budget);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    "income"
  );
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );

  const handleTransactionSubmit = (
    transactionData: Omit<Transaction, "id" | "type">
  ) => {
    const newTransaction = {
      id: Date.now().toString(),
      type: transactionType,
      ...transactionData,
    };

    dispatch(addTransaction(newTransaction));
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 py-6 px-4 w-full max-w-screen-lg mx-auto min-h-[calc(100vh-146px)] overflow-y-auto dark:bg-gray-900">
      {/* Bütçe Gösterimi */}
      <div className="text-center p-4 bg-white rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Toplam Bütçe
        </h2>
        <p
          className={`text-3xl font-bold ${
            budget >= 0 ? "text-green-600" : "text-red-600"
          } dark:text-white`}
        >
          {budget} TL
        </p>
      </div>

      {/* Gelir/Gider Ekleme Butonları */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => {
            setTransactionType("income");
            setIsModalOpen(true);
          }}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
        >
          Gelir Ekle
        </button>
        <button
          onClick={() => {
            setTransactionType("expense");
            setIsModalOpen(true);
          }}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
        >
          Gider Ekle
        </button>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleTransactionSubmit}
        type={transactionType}
      />

      {/* İşlem Listesi için yer tutucu */}
      <div className="mt-6">
        {/* Buraya işlem listesi gelecek */}
        <TransactionList transactions={transactions} categories={[]} />
      </div>
    </div>
  );
};

export default IncomeExpensePage;
