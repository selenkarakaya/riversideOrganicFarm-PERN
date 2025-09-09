const express = require("express");
const router = express.Router();
const {
  getCategories,
  getRecipesByCategory,
} = require("../controllers/categoryController");

router.get("/", getCategories);
router.get("/:categoryId", getRecipesByCategory);

module.exports = router;
