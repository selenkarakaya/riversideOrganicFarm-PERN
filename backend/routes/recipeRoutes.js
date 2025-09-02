const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  getRecipes,
  getRecipeById,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  getRecipesByCategory,
} = require("../controllers/recipeController");

const {
  getIngredientsByRecipe,
} = require("../controllers/ingredientsController");

router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.post("/", protect, createRecipe);
router.delete("/:id", protect, deleteRecipe);
router.put("/:id", protect, updateRecipe);
router.get("/category/:categoryId", getRecipesByCategory);
router.get("/:recipeId/ingredients", getIngredientsByRecipe);

module.exports = router;
