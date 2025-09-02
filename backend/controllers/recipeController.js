const asyncHandler = require("express-async-handler");

const Recipe = require("../models/Recipe");

const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.findAll({
    attributes: ["id", "title", "servings", "prep_minutes", "cook_minutes"],
  });
  if (!recipes || recipes.length === 0) {
    return res.status(404).json({ message: "No recipes found" });
  }

  res.json(recipes);
});

const getRecipeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipe.findByPk(id);

  if (!recipe) {
    return res.status(404).json({ message: "No recipe found" });
  }

  res.json(recipe);
});

// recipeController.js

const createRecipe = asyncHandler(async (req, res) => {
  const { title, description, servings, prep_minutes, cook_minutes } = req.body;

  if (!title || servings == null) {
    return res.status(400).json({ message: "Title and servings are required" });
  }

  try {
    const newRecipe = await Recipe.create({
      title,
      description,
      servings,
      prep_minutes,
      cook_minutes,
      user_id: req.user.id,
    });
    res.status(201).json(newRecipe);
  } catch (err) {
    console.error(err.errors); // hangi alan hatalı
    res.status(500).json({ message: "Validation error", details: err.errors });
  }
});

module.exports = { getRecipes, getRecipeById, createRecipe };
