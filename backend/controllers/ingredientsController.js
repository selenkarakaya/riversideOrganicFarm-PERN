const asyncHandler = require("express-async-handler");
const Ingredient = require("../models/Ingredient");

// @desc    Get ingredients for a specific recipe
// @route   GET /api/recipes/:recipeId/ingredients
// @access  Public
const getIngredientsByRecipe = asyncHandler(async (req, res) => {
  // 1️⃣ Extract recipe ID from request parameters
  const { recipeId } = req.params;

  // 2️⃣ Find all ingredients that belong to the recipe
  const ingredients = await Ingredient.findAll({
    where: { recipe_id: recipeId },
    attributes: ["id", "name", "amount", "unit"],
  });

  // 3️⃣ If no ingredients found, return 404
  if (!ingredients.length) {
    return res
      .status(404)
      .json({ message: "No ingredients found for this recipe" });
  }

  // 4️⃣ Send ingredients as JSON response
  res.json(ingredients);
});

module.exports = { getIngredientsByRecipe };
