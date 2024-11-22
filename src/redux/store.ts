import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import transactionSlice from "./transactionSlice";

export const store = configureStore({
  reducer: {
    categories: categorySlice,
    transactions: transactionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
