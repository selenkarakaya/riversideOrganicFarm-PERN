import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL + "/recipes";
const axiosConfig = {
  withCredentials: true,
};

const getRecipes = async () => {
  const res = await axios.get(`${API_URL}/`, axiosConfig);
  return res.data;
};

const recipeService = {
  getRecipes,
};
export default recipeService;
