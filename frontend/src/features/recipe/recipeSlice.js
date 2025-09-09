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
export const getRecipeById = createAsyncThunk(
  "products/fetchById",
  async (id, thunkAPI) => {
    try {
      return await recipeService.getRecipeById(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Async thunk: fetch recipes by category
export const getRecipesByCategory = createAsyncThunk(
  "recipes/getByCategory",
  async (categoryId, thunkAPI) => {
    try {
      return await recipeService.getByCategory(categoryId);
    } catch (error) {
      if (error.response?.status === 404) {
        return [];
      }
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error fetching category recipes"
      );
    }
  }
);

// ✅ Create recipe
export const createRecipe = createAsyncThunk(
  "recipes/create",
  async (recipeData, thunkAPI) => {
    try {
      return await recipeService.createRecipe(recipeData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Async thunk: get recipes created by the logged-in user
export const getMyRecipes = createAsyncThunk(
  "recipes/getMyRecipes",
  async (_, thunkAPI) => {
    try {
      return await recipeService.getMyRecipes();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// ✅ Delete recipe
export const deleteRecipe = createAsyncThunk(
  "recipes/delete",
  async (id, thunkAPI) => {
    try {
      return await recipeService.deleteRecipeById(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Update recipe thunk
export const updateRecipe = createAsyncThunk(
  "recipes/update",
  async ({ id, recipeData }, thunkAPI) => {
    try {
      return await recipeService.updateRecipeById(id, recipeData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    selected: null,
    selectedCategoryId: null,
  },

  reducers: {
    setSelectedCategoryId: (state, action) => {
      state.selectedCategoryId = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selected = null;
    },
  },

  extraReducers: (builder) => {
    builder // All recipes
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
      }) // Category recipes
      .addCase(getRecipesByCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getRecipesByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getRecipesByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      }) // Recipe Detail
      .addCase(getRecipeById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getRecipeById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedRecipe = action.payload;
      })
      .addCase(getRecipeById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      }) // Create Recipe
      .addCase(createRecipe.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getMyRecipes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getMyRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // user recipes
      })
      .addCase(getMyRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        // Remove the deleted recipe using the ID passed to the thunk
        state.items = state.items.filter((r) => r.id !== action.meta.arg);

        // Optional: if viewing recipe detail, clear it
        if (state.selectedRecipe?.id === action.meta.arg) {
          state.selectedRecipe = null;
        }
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        const index = state.items.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedRecipe?.id === action.payload.id) {
          state.selectedRecipe = action.payload;
        }
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setSelectedCategoryId, clearSelectedProduct } =
  recipeSlice.actions;
export default recipeSlice.reducer;
