import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recipeService from "./recipeService";

// Async thunk: get all recipes from API
export const getRecipes = createAsyncThunk(
  "recipe/getRecipes",
  async (_, thunkAPI) => {
    try {
      return await recipeService.getRecipes();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Async thunk: retrieve single recipe

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },

  extraReducers: (builder) => {
    builder // All Products
      .addCase(getRecipes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default recipeSlice.reducer;
