const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./User");

const Recipe = sequelize.define(
  "Recipe",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    prep_minutes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cook_minutes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "recipes",
    timestamps: false,
    hooks: {
      beforeUpdate: (recipe) => {
        recipe.updated_at = new Date();
      },
    },
  }
);

Recipe.belongsTo(User, { foreignKey: "user_id" });

module.exports = Recipe;
