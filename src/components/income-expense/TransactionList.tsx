"use client";
import React, { useState, useEffect } from "react"; // useEffect ekleniyor
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Category } from "@/redux/categorySlice";
import BudgetModal from "./BudgetModal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
  categories: Category[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const categoriesFromStorage = localStorage.getItem("categories");
      const parsedCategories = categoriesFromStorage
        ? JSON.parse(categoriesFromStorage)
        : [];
      setCategories(parsedCategories);
    }
  }, []);

  const sortedTransactions = [...transactions].reverse();

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat: Category) => cat.id === categoryId);
    return category?.name || "Bilinmeyen Kategori";
  };

  const getCategoryLimit = (categoryId: string) => {
    const category = categories.find((cat: Category) => cat.id === categoryId);
    return category?.monthlyLimit || 0; // Eğer limit yoksa 0 döndürür
  };

  const isLimitReached = (
    amount: number,
    categoryId: string,
    transactionDate: string
  ) => {
    const categoryLimit = getCategoryLimit(categoryId);

    const transactionMonth = new Date(transactionDate).getMonth();
    const transactionYear = new Date(transactionDate).getFullYear();

    const totalSpent = transactions
      .filter(
        (transaction) =>
          transaction.category === categoryId &&
          transaction.type === "expense" &&
          new Date(transaction.date).getMonth() === transactionMonth &&
          new Date(transaction.date).getFullYear() === transactionYear
      )
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    return categoryLimit > 0 && totalSpent >= categoryLimit * 0.8;
  };

  const resetData = () => {
    const confirmReset = window.confirm(
      "Tüm verileri silmek istediğinize emin misiniz?"
    );
    if (confirmReset) {
      localStorage.removeItem("transactionState");
      window.location.reload();
    }
  };

  const getBudgetSuggestions = () => {
    const suggestions: { category: string; suggestion: string }[] = [];

    categories.forEach((category: Category) => {
      const totalSpent = transactions
        .filter(
          (transaction) =>
            transaction.category === category.id &&
            transaction.type === "expense"
        )
        .reduce((acc, transaction) => acc + transaction.amount, 0);

      const limit = category.monthlyLimit || 0;
      const remainingBudget = limit - totalSpent;

      if (limit > 0) {
        if (remainingBudget < 0) {
          suggestions.push({
            category: category.name,
            suggestion: `Bu kategoride <strong class="text-red-600">${Math.abs(
              remainingBudget
            )} TL</strong>  aşım var!`,
          });
        } else if (remainingBudget > 0) {
          suggestions.push({
            category: category.name,
            suggestion: `Bu kategoride <strong class="text-green-600">${remainingBudget} TL </strong> harcama yapabilirsiniz.`,
          });
        }
      }
    });

    return suggestions.filter((suggestion) =>
      suggestion.suggestion.includes("TL")
    );
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);

    autoTable(doc, {
      head: [["Tür", "Açıklama", "Tutar", "Kategori", "Tarih"]],
      body: transactions.map((transaction) => [
        transaction.type,
        transaction.description,
        `${transaction.amount} TL`,
        getCategoryName(transaction.category),
        format(new Date(transaction.date), "dd MMMM yyyy", { locale: tr }),
      ]),
      didParseCell: (data) => {
        data.cell.text = data.cell.text.map((text) =>
          text
            .replace(/ğ/g, "g")
            .replace(/Ğ/g, "G")
            .replace(/ü/g, "u")
            .replace(/Ü/g, "U")
            .replace(/ş/g, "s")
            .replace(/Ş/g, "S")
            .replace(/ı/g, "i")
            .replace(/İ/g, "I")
            .replace(/ç/g, "c")
            .replace(/Ç/g, "C")
            .replace(/ö/g, "o")
            .replace(/Ö/g, "O")
            .replace(/ğ/g, "g")
            .replace(/Ğ/g, "G")
        );
      },
    });

    doc.save("islem_listesi.pdf");
  };

  return (
    <div className="mt-6">
      <div className="mt-4 flex justify-center items-center gap-2">
        <button
          onClick={openModal}
          className="mb-4 bg-blue-500 text-white p-2 rounded"
        >
          Bütçe Önerileri
        </button>
        <BudgetModal
          isOpen={isModalOpen}
          onClose={closeModal}
          suggestions={getBudgetSuggestions()}
        />

        {sortedTransactions.length > 0 && (
          <button
            onClick={resetData}
            className="mb-4 bg-red-500 text-white p-2 rounded"
          >
            Tüm Verileri Sıfırla
          </button>
        )}

        <button
          onClick={handleDownloadPDF}
          className="text-white p-2 rounded bg-orange-400 mb-4"
        >
          PDF İndir
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4 text-center dark:text-white">
        İşlem Geçmişi
      </h3>
      <div className="space-y-3">
        {sortedTransactions.map((transaction) => {
          const totalSpent = transaction.amount; // Toplam harcama değeri
          const limitReached = isLimitReached(
            totalSpent,
            transaction.category,
            transaction.date
          ); // Limit kontrolü

          return (
            <div
              key={transaction.id}
              className={`py-4 px-2 rounded-lg shadow-md flex items-center justify-between
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
                  <div className="text-sm text-gray-600 flex flex-col lg:flex-row justify-center items-start lg:items-center gap-1">
                    <p className="lg:mr-2">
                      Kategori: {getCategoryName(transaction.category)}
                    </p>
                    <p className="lg:mr-2">
                      Aylık Limit: {getCategoryLimit(transaction.category)} TL
                      limit
                    </p>
                    <p>
                      {format(new Date(transaction.date), "dd MMMM yyyy", {
                        locale: tr,
                      })}
                    </p>
                  </div>
                  {limitReached && (
                    <p className="text-red-600 text-sm">
                      <span className="blink">⚠️</span> %80 harcama limitine
                      ulaştınız!
                    </p>
                  )}
                </div>
              </div>
              <div
                className={`font-bold whitespace-nowrap
                  ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
              >
                {transaction.type === "income" ? "+" : "-"} {totalSpent} TL
              </div>
            </div>
          );
        })}
        {sortedTransactions.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            Henüz işlem bulunmamaktadır. Gelir veya gider ekleyerek işlem
            yapmaya başlayın.
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
