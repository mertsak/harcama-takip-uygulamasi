import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
  id: string;
  name: string;
  monthlyLimit: number;
  isDefault?: boolean; // Varsayılan kategori kontrolü için
}

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    initializeCategories: (state, action: PayloadAction<Category[]>) => {
      if (action.payload && action.payload.length > 0) {
        state.categories = action.payload;
        // localStorage'a kaydetme eklendi
        if (typeof window !== "undefined") {
          localStorage.setItem("categories", JSON.stringify(action.payload));
        }
      }
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("categories", JSON.stringify(state.categories));
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (cat) => cat.id !== action.payload
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("categories", JSON.stringify(state.categories));
      }
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex(
        (cat) => cat.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
        if (typeof window !== "undefined") {
          localStorage.setItem("categories", JSON.stringify(state.categories));
        }
      }
    },
  },
});

export const {
  addCategory,
  deleteCategory,
  initializeCategories,
  updateCategory,
} = categorySlice.actions;
export default categorySlice.reducer;
