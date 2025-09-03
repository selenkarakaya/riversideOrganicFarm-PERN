const asyncHandler = require("express-async-handler");
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

module.exports = { getCategories };
