// models/Ingredient.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Recipe = require("./Recipe");

const Ingredient = sequelize.define(
  "Ingredient",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Recipe, key: "id" },
      onDelete: "CASCADE",
    },
    name: { type: DataTypes.TEXT, allowNull: false },
    amount: { type: DataTypes.NUMERIC, allowNull: false },
    unit: {
      type: DataTypes.ENUM("g", "ml", "cup", "tsp", "tbsp", "pcs"),
      allowNull: true,
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "ingredients",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Ingredient.belongsTo(Recipe, { foreignKey: "recipe_id" });
Recipe.hasMany(Ingredient, { foreignKey: "recipe_id" });

module.exports = Ingredient;
