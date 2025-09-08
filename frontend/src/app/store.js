import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import recipeReducer from "../features/recipe/recipeSlice";
import categoryReducer from "../features/category/categorySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    recipes: recipeReducer,
    categories: categoryReducer,
  },
});
