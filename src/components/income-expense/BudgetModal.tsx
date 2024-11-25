import React from "react";

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  suggestions: { category: string; suggestion: string }[];
}

const BudgetModal: React.FC<BudgetModalProps> = ({
  isOpen,
  onClose,
  suggestions,
}) => {
  if (!isOpen) return null;

  console.log(suggestions);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h4 className="text-lg font-semibold mb-2">Bütçe Önerileri</h4>
        <ul>
          {suggestions.length === 0 ? ( // Öneri yoksa mesaj göster
            <li className="text-sm">
              Henüz öneri yok. Lütfen kategori ekleyin ve kategoriye aylık limit
              belirleyin.
            </li>
          ) : (
            suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: suggestion.category + ": " + suggestion.suggestion,
                }}
              />
            ))
          )}
        </ul>
        <div className="w-full flex justify-end items-center">
          {" "}
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white p-2 rounded "
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetModal;
