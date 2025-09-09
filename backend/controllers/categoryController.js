const asyncHandler = require("express-async-handler");
const Recipe = require("../models/Recipe");
const Category = require("../models/Category");

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  // 1️⃣ Fetch all categories with selected attributes
  const categories = await Category.findAll({ attributes: ["id", "name"] });

  // 2️⃣ Send categories as JSON response
  res.json(categories);
});

// @desc    Get recipes by category ID
// @route   GET /api/categories/:categoryId/recipes
// @access  Public
const getRecipesByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  // kategoriye ait recipe'leri getir
  const category = await Category.findByPk(categoryId, {
    include: {
      model: Recipe,
      attributes: [
        "id",
        "title",
        "description",
        "servings",
        "prep_minutes",
        "cook_minutes",
      ],
      through: { attributes: [] }, // join table fields gösterme
    },
  });

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(category.Recipes); // sadece recipe listesi dönüyoruz
});

module.exports = { getCategories, getRecipesByCategory };
