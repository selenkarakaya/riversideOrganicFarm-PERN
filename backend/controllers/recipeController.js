const asyncHandler = require("express-async-handler");
const Recipe = require("../models/Recipe");
const Category = require("../models/Category");
const Ingredient = require("../models/Ingredient");

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

const createRecipe = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    servings,
    prep_minutes,
    cook_minutes,
    ingredients,
  } = req.body;

  if (!title || servings == null) {
    return res.status(400).json({ message: "Title and servings are required" });
  }

  // 1️⃣ Recipe oluştur
  const newRecipe = await Recipe.create({
    title,
    description,
    servings,
    prep_minutes,
    cook_minutes,
    user_id: req.user.id,
  });

  // 2️⃣ Eğer ingredients varsa, ayrı ayrı ekle
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

  // 3️⃣ Recipe + ingredients’i geri gönder
  const recipeWithIngredients = await Recipe.findByPk(newRecipe.id, {
    include: {
      model: Ingredient,
      attributes: ["id", "name", "amount", "unit"],
    },
  });

  res.status(201).json(recipeWithIngredients);
});

// @desc    Delete a recipe by ID
// @route   DELETE /api/recipes/:id
// @access  Private (only owner)
const deleteRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params;

  //1️⃣ find recipe
  const recipe = await Recipe.findByPk(id);
  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }

  // 2️⃣ Sadece owner’ın silebilmesini sağla
  if (recipe.user_id !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to delete this recipe");
  }

  // 3️⃣ Sil
  await recipe.destroy();
  res.json({
    message: "Recipe deleted successfully",
  });
});

// @desc    Update a recipe by ID
// @route   PUT /api/recipes/:id
// @access  Private (only owner)
const updateRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, servings, prep_minutes, cook_minutes } = req.body;
  //1️⃣ find recipe
  const recipe = await Recipe.findByPk(id);
  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }

  // 2️⃣ Sadece owner’ın silebilmesini sağla
  if (recipe.user_id !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to update this recipe");
  }

  // 3️⃣ Alanları güncelle
  recipe.title = title || recipe.title;
  recipe.description = description || recipe.description;
  recipe.servings = servings != null ? servings : recipe.servings;
  recipe.prep_minutes =
    prep_minutes != null ? prep_minutes : recipe.prep_minutes;
  recipe.cook_minutes =
    cook_minutes != null ? cook_minutes : recipe.cook_minutes;

  // 4️⃣ Kaydet
  await recipe.save();

  res.json(recipe);
});

const getRecipesByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  // Kategoriyi ve ilişkili recipe’leri getir
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
      through: { attributes: [] }, // join tablosu bilgilerini gizle
    },
  });

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

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
