import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
  id: string;
  type: "income" | "expense";
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface TransactionState {
  transactions: Transaction[];
  budget: number;
}

const loadState = (): TransactionState => {
  try {
    // localStorage'ın erişilebilir olup olmadığını kontrol et
    if (typeof localStorage !== "undefined") {
      const savedState = localStorage.getItem("transactionState");
      if (savedState) {
        return JSON.parse(savedState);
      }
    }
  } catch (err) {
    console.error("Error loading state:", err);
  }
  return { transactions: [], budget: 0 };
};

const initialState: TransactionState = loadState();

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
      state.budget +=
        action.payload.type === "income"
          ? action.payload.amount
          : -action.payload.amount;

      // Save to localStorage
      localStorage.setItem("transactionState", JSON.stringify(state));
    },
  },
});

export const { addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
