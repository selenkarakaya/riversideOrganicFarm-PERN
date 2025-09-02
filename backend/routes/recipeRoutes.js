const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  getRecipes,
  getRecipeById,
  createRecipe,
} = require("../controllers/recipeController");

router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.post("/", protect, createRecipe);

module.exports = router;
