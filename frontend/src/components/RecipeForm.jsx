import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createRecipe, updateRecipe } from "../features/recipe/recipeSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RecipeForm({ recipe = null, onSuccess }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: recipe?.title || "",
    servings: recipe?.servings || 1,
    prep_minutes: recipe?.prep_minutes || "",
    cook_minutes: recipe?.cook_minutes || "",
    description: recipe?.description || "",
    ingredients: recipe?.ingredients || [{ name: "", amount: "", unit: "g" }],
  });

  // Handle input changes for general fields
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle ingredient changes
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][field] = value;
    setFormData((prev) => ({ ...prev, ingredients: updatedIngredients }));
  };

  // Add new ingredient row
  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", amount: "", unit: "g" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        servings: Number(formData.servings),
        prep_minutes: formData.prep_minutes
          ? Number(formData.prep_minutes)
          : null,
        cook_minutes: formData.cook_minutes
          ? Number(formData.cook_minutes)
          : null,
        ingredients: formData.ingredients
          .filter((i) => i.name && i.amount)
          .map((i) => ({
            name: i.name,
            amount: Number(i.amount),
            unit: i.unit,
          })),
      };

      if (recipe) {
        // 🟢 Update
        await dispatch(
          updateRecipe({ id: recipe.id, recipeData: payload })
        ).unwrap();
        toast.success("Recipe updated successfully!");
      } else {
        // 🟢 Create
        await dispatch(createRecipe(payload)).unwrap();
        toast.success("Recipe created successfully!");
      }

      if (onSuccess) onSuccess(); // parent callback
      else navigate("/YourRecipes");
    } catch (err) {
      toast.error(err || "Operation failed");
    }
  };
  return (
    <div className="mx-auto">
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        {/* Recipe Name & Servings */}
        <div className="flex flex-wrap mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Recipe Name
            </label>
            <input
              type="text"
              placeholder="Name your recipe"
              maxLength="32"
              minLength="3"
              required
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="block w-full bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Serving Size
            </label>
            <input
              type="number"
              placeholder="2"
              min="1"
              max="10"
              required
              value={formData.servings}
              onChange={(e) => handleChange("servings", e.target.value)}
              className="appearance-none block w-full bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>

        {/* Prep & Cook Time */}
        <div className="flex flex-wrap mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Prep Time (min)
            </label>
            <input
              type="number"
              placeholder="15"
              min="1"
              value={formData.prep_minutes}
              onChange={(e) => handleChange("prep_minutes", e.target.value)}
              className="block w-full bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Cook Time (min)
            </label>
            <input
              type="number"
              placeholder="30"
              min="1"
              value={formData.cook_minutes}
              onChange={(e) => handleChange("cook_minutes", e.target.value)}
              className="block w-full bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            />
          </div>
        </div>

        {/* Ingredients */}
        <div className="flex flex-wrap mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Ingredients
            </label>
            {formData.ingredients.map((ing, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={ing.name}
                  onChange={(e) =>
                    handleIngredientChange(idx, "name", e.target.value)
                  }
                  className="flex-1 bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-2 px-3 focus:bg-white"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={ing.amount}
                  onChange={(e) =>
                    handleIngredientChange(idx, "amount", e.target.value)
                  }
                  className="w-24 bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-2 px-3 focus:bg-white"
                />
                <select
                  value={ing.unit}
                  onChange={(e) =>
                    handleIngredientChange(idx, "unit", e.target.value)
                  }
                  className="w-24 bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-2 px-3 focus:bg-white"
                >
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                  <option value="cup">cup</option>
                  <option value="tsp">tsp</option>
                  <option value="tbsp">tbsp</option>
                  <option value="pcs">pcs</option>
                </select>
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="mt-2 px-3 py-1 bg-darkGreen text-white rounded hover:bg-greens"
            >
              + Add Ingredient
            </button>
          </div>
        </div>

        {/* Description / Instructions */}
        <div className="flex flex-wrap mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Instructions
            </label>
            <textarea
              rows="3"
              required
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 bg-indigo-100 text-indigo-600 border-indigo-800 focus:bg-white shadow-sm ring-1 sm:text-sm sm:leading-6"
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/2 bg-darkGreen py-4 rounded-2xl hover:bg-greens hover:text-white"
          >
            {recipe ? "Update Recipe" : "Create Recipe"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RecipeForm;
