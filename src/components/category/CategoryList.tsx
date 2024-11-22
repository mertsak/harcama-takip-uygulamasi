"use client";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  Category,
  deleteCategory,
  initializeCategories,
} from "@/redux/categorySlice";
import { useEffect, useState } from "react";
import { defaultCategories } from "@/mock/defaultCategories";
import { CategorySetupModal } from "./CategorySetupModal";

export function CategoryList() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  useEffect(() => {
    const savedCategories = localStorage.getItem("categories");

    // Debug için loglar
    console.log("Saved categories:", savedCategories);
    console.log("Default categories:", defaultCategories);

    if (savedCategories && JSON.parse(savedCategories).length > 0) {
      // Eğer localStorage'da kategori varsa onları yükle
      dispatch(initializeCategories(JSON.parse(savedCategories)));
    } else {
      // Eğer localStorage boşsa veya geçersizse, varsayılan kategorileri yükle
      console.log("Loading default categories");
      localStorage.setItem("categories", JSON.stringify(defaultCategories)); // Önce localStorage'a kaydet
      dispatch(initializeCategories(defaultCategories));
    }
  }, [dispatch]);

  return (
    <div className=" bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold">Kategoriler</h2>
        <div className="group relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-500 cursor-help"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
          <div className="invisible group-hover:visible absolute left-0 top-6 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
            Kategoriler, harcamalarınızı organize etmenize ve takip etmenize
            yardımcı olur. Her kategori için aylık limit belirleyebilirsiniz.
          </div>
        </div>
      </div>

      {categories.length === 0 ? (
        <p className="text-gray-500">Henüz kategori eklenmemiş.</p>
      ) : (
        <div className="space-y-3">
          {[...categories].reverse().map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-md border border-gray-200"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{category.name}</h3>
                  {category.isDefault && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Varsayılan
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  Aylık Limit:{" "}
                  {category.monthlyLimit === 0
                    ? "Belirlenmedi"
                    : `${category.monthlyLimit.toLocaleString("tr-TR")} ₺`}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCategory(category)}
                  className="text-blue-500 hover:text-blue-700 p-2"
                  title="Limit Belirle"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>

                {!category.isDefault && (
                  <button
                    onClick={() => dispatch(deleteCategory(category.id))}
                    className="text-red-500 hover:text-red-700 p-2"
                    title="Kategoriyi Sil"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCategory && (
        <CategorySetupModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </div>
  );
}
