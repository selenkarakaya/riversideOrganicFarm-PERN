import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL + "/recipes";
const axiosConfig = {
  withCredentials: true,
};

// ✅ Get all recipes
const getRecipes = async () => {
  const res = await axios.get(`${API_URL}/`);
  return res.data;
};

// ✅ Get recipe by Id
const getRecipeById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// ✅ Get recipes by category
const getByCategory = async (categoryId) => {
  const res = await axios.get(`${API_URL}/category/${categoryId}`);
  return res.data;
};

// ✅ Create new recipe
const createRecipe = async (recipeData) => {
  const res = await axios.post(`${API_URL}/`, recipeData, axiosConfig);
  return res.data;
};

// ✅ Get recipes created by the logged-in user
const getMyRecipes = async () => {
  const res = await axios.get(`${API_URL}/my`, axiosConfig);
  return res.data;
};

// ✅ Delete a recipe
const deleteRecipeById = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, axiosConfig);
  return res.data;
};

// ✅ Update a recipe
const updateRecipeById = async (id, recipeData) => {
  const res = await axios.put(`${API_URL}/${id}`, recipeData, axiosConfig);
  return res.data;
};
const recipeService = {
  getRecipes,
  getByCategory,
  getRecipeById,
  createRecipe,
  getMyRecipes,
  deleteRecipeById,
  updateRecipeById,
};
export default recipeService;
