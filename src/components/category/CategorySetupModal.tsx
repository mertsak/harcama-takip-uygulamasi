import { updateCategory } from "@/redux/categorySlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { Category } from "@/redux/categorySlice";

interface CategorySetupModalProps {
  category: Category;
  onClose: () => void;
}

export function CategorySetupModal({
  category,
  onClose,
}: CategorySetupModalProps) {
  const dispatch = useDispatch();
  const [monthlyLimit, setMonthlyLimit] = useState(
    category.monthlyLimit.toString()
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      updateCategory({
        ...category,
        monthlyLimit: Number(monthlyLimit),
      })
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {category.name} için Limit Belirle
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Aylık Limit (₺)
            </label>
            <input
              type="number"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Örn: 1000"
              required
              min="0"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
