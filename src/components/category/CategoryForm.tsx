"use client";

import { addCategory } from "@/redux/categorySlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export function CategoryForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    monthlyLimit: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.monthlyLimit) {
      alert("Lütfen tüm alanları doldurun");
      return;
    }

    const newCategory = {
      id: crypto.randomUUID(),
      name: formData.name,
      monthlyLimit: Number(formData.monthlyLimit),
    };

    dispatch(addCategory(newCategory));

    setFormData({
      name: "",
      monthlyLimit: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Yeni Kategori Ekle
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
          >
            Kategori Adı
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Örn: Market, Kira, Faturalar"
            required
          />
        </div>

        <div>
          <div className="flex items-center gap-1 mb-1">
            <label
              htmlFor="monthlyLimit"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Aylık Limit (₺)
            </label>
            <div className="group relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-gray-500 cursor-help"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
              <div className="invisible group-hover:visible absolute left-0 top-6 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                Aylık limit belirlemen, gider harcamalarında seni uyarmamızı
                sağlayacaktır.
              </div>
            </div>
          </div>

          <input
            type="number"
            id="monthlyLimit"
            value={formData.monthlyLimit}
            onChange={(e) =>
              setFormData({ ...formData, monthlyLimit: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Örn: 1000"
            min="0"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Kategori Ekle
        </button>
      </form>
    </div>
  );
}
