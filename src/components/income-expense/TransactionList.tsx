"use client";
import React from "react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Category } from "@/redux/categorySlice";

interface Transaction {
  id: string;
  type: "income" | "expense";
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  categories: Category[]; // Kategorileri props olarak alın
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  // LocalStorage'dan kategorileri al
  const categoriesFromStorage = localStorage.getItem("categories");
  const categories = categoriesFromStorage
    ? JSON.parse(categoriesFromStorage)
    : [];

  const sortedTransactions = [...transactions].reverse();

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat: Category) => cat.id === categoryId);
    return category?.name || "Bilinmeyen Kategori";
  };

  // Yeni fonksiyon ekliyoruz
  const getCategoryLimit = (categoryId: string) => {
    const category = categories.find((cat: Category) => cat.id === categoryId);
    return category?.monthlyLimit || 0; // Eğer limit yoksa 0 döndürür
  };

  console.log(sortedTransactions);

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4 text-center">İşlem Geçmişi</h3>
      <div className="space-y-3">
        {sortedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className={`p-4 rounded-lg shadow-md flex items-center justify-between
              ${transaction.type === "income" ? "bg-green-50" : "bg-red-50"}`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`p-2 rounded-full
                  ${
                    transaction.type === "income"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
              >
                {transaction.type === "income" ? "↑" : "↓"}
              </div>
              <div>
                <p className="font-semibold">{transaction.description}</p>
                <p className="text-sm text-gray-600">
                  {getCategoryName(transaction.category)} •{" "}
                  {getCategoryLimit(transaction.category)} TL limit •{" "}
                  {format(new Date(transaction.date), "dd MMMM yyyy", {
                    locale: tr,
                  })}
                </p>
              </div>
            </div>
            <div
              className={`font-bold
                ${
                  transaction.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
            >
              {transaction.type === "income" ? "+" : "-"} {transaction.amount}{" "}
              TL
            </div>
          </div>
        ))}
        {sortedTransactions.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            Henüz işlem bulunmamaktadır.
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
