// models/RecipeCategory.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const RecipeCategory = sequelize.define(
  "RecipeCategory",
  {
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "recipes",
        key: "id",
      },
      onDelete: "CASCADE",
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
      onDelete: "CASCADE",
      primaryKey: true,
    },
  },
  {
    tableName: "recipe_categories",
    timestamps: false,
  }
);

module.exports = RecipeCategory;
