const express = require("express");
const router = express.Router();
const {
  getIngredientsByRecipe,
} = require("../controllers/ingredientsController");

module.exports = router;
