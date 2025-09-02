const asyncHandler = require("express-async-handler");
const Ingredient = require("../models/Ingredient");

const getIngredientsByRecipe = asyncHandler(async (req, res) => {
  const { recipeId } = req.params;

  const ingredients = await Ingredient.findAll({
    where: { recipe_id: recipeId },
    attributes: ["id", "name", "amount", "unit"],
  });

  if (!ingredients.length) {
    return res
      .status(404)
      .json({ message: "No ingredients found for this recipe" });
  }

  res.json(ingredients);
});

module.exports = { getIngredientsByRecipe };
