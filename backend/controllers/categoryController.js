const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.findAll({ attributes: ["id", "name"] });

  res.json(categories);
});

module.exports = { getCategories };
