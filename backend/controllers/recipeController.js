const asyncHandler = require("express-async-handler");
const Recipe = require("../models/Recipe");
const Category = require("../models/Category");
const Ingredient = require("../models/Ingredient");

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
const getRecipes = asyncHandler(async (req, res) => {
  // 1️⃣ Fetch all recipes with selected attributes
  const recipes = await Recipe.findAll({
    attributes: ["id", "title", "servings", "prep_minutes", "cook_minutes"],
  });

  // 2️⃣ If no recipes found, return 404
  if (!recipes || recipes.length === 0) {
    return res.status(404).json({ message: "No recipes found" });
  }

  // 3️⃣ Send recipes as JSON response
  res.json(recipes);
});

// @desc    Get a recipe by ID
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = asyncHandler(async (req, res) => {
  // 1️⃣ Extract recipe ID from request parameters
  const { id } = req.params;

  // 2️⃣ Find recipe by primary key (ID)
  const recipe = await Recipe.findByPk(id);

  // 3️⃣ If recipe not found, return 404
  if (!recipe) {
    return res.status(404).json({ message: "No recipe found" });
  }

  // 4️⃣ Send recipe as JSON response
  res.json(recipe);
});

// const createRecipe = asyncHandler(async (req, res) => {
//   const { title, description, servings, prep_minutes, cook_minutes } = req.body;

//   if (!title || servings == null) {
//     return res.status(400).json({ message: "Title and servings are required" });
//   }

//   try {
//     const newRecipe = await Recipe.create({
//       title,
//       description,
//       servings,
//       prep_minutes,
//       cook_minutes,
//       user_id: req.user.id,
//     });
//     res.status(201).json(newRecipe);
//   } catch (err) {
//     console.error(err.errors); // hangi alan hatalı
//     res.status(500).json({ message: "Validation error", details: err.errors });
//   }
// });

// @desc    Create a new recipe (with optional ingredients)
// @route   POST /api/recipes
// @access  Private (requires authentication)
const createRecipe = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    servings,
    prep_minutes,
    cook_minutes,
    ingredients,
  } = req.body;

  // 1️⃣ Validate required fields
  if (!title || servings == null) {
    return res.status(400).json({ message: "Title and servings are required" });
  }

  // 2️⃣ Create the recipe in the database
  const newRecipe = await Recipe.create({
    title,
    description,
    servings,
    prep_minutes,
    cook_minutes,
    user_id: req.user.id,
  });

  // 3️⃣ If ingredients are provided, create them linked to the recipe
  if (ingredients && Array.isArray(ingredients)) {
    for (const item of ingredients) {
      await Ingredient.create({
        recipe_id: newRecipe.id,
        name: item.name,
        amount: item.amount,
        unit: item.unit,
      });
    }
  }

  // 4️⃣ Fetch recipe with ingredients included
  const recipeWithIngredients = await Recipe.findByPk(newRecipe.id, {
    include: {
      model: Ingredient,
      attributes: ["id", "name", "amount", "unit"],
    },
  });

  // 5️⃣ Send response with the newly created recipe
  res.status(201).json(recipeWithIngredients);
});

// @desc    Delete a recipe by ID
// @route   DELETE /api/recipes/:id
// @access  Private (only owner)
const deleteRecipe = asyncHandler(async (req, res) => {
  // 1️⃣ Extract recipe ID from request parameters
  const { id } = req.params;

  // 2️⃣ Find recipe by ID
  const recipe = await Recipe.findByPk(id);
  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }

  // 3️⃣ Ensure only the owner can delete the recipe
  if (recipe.user_id !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to delete this recipe");
  }

  // 4️⃣ Delete the recipe from the database
  await recipe.destroy();

  // 5️⃣ Send success response
  res.json({
    message: "Recipe deleted successfully",
  });
});
// @desc    Update a recipe by ID
// @route   PUT /api/recipes/:id
// @access  Private (only owner)
const updateRecipe = asyncHandler(async (req, res) => {
  // 1️⃣ Extract recipe ID from request parameters
  const { id } = req.params;

  // 2️⃣ Extract fields to update from request body
  const { title, description, servings, prep_minutes, cook_minutes } = req.body;

  // 3️⃣ Find recipe by ID
  const recipe = await Recipe.findByPk(id);
  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }

  // 4️⃣ Ensure only the owner can update the recipe
  if (recipe.user_id !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to update this recipe");
  }

  // 5️⃣ Update fields (only if provided, otherwise keep existing values)
  recipe.title = title || recipe.title;
  recipe.description = description || recipe.description;
  recipe.servings = servings != null ? servings : recipe.servings;
  recipe.prep_minutes =
    prep_minutes != null ? prep_minutes : recipe.prep_minutes;
  recipe.cook_minutes =
    cook_minutes != null ? cook_minutes : recipe.cook_minutes;

  // 6️⃣ Save updated recipe
  await recipe.save();

  // 7️⃣ Send updated recipe as response
  res.json(recipe);
});

// @desc    Get recipes by category ID
// @route   GET /api/recipes/category/:categoryId
// @access  Public
const getRecipesByCategory = asyncHandler(async (req, res) => {
  // 1️⃣ Extract category ID from request parameters
  const { categoryId } = req.params;

  // 2️⃣ Find category by ID and include related recipes
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
      through: { attributes: [] }, // hide join table fields
    },
  });

  // 3️⃣ If category not found, return 404
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  // 4️⃣ Return the recipes linked to this category
  res.json(category.Recipes);
});

module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  getRecipesByCategory,
};
