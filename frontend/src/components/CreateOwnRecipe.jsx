import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createRecipe } from "../features/recipe/recipeSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//SILEBILIRSIN BUNU
function CreateOwnRecipe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    servings: 1,
    prep_minutes: "",
    cook_minutes: "",
    description: "",
    ingredients: [{ name: "", amount: "", unit: "g" }],
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

    // Basic validation
    if (!formData.title || !formData.servings) {
      toast.error("Recipe name and servings are required!");
      return;
    }

    const validIngredients = formData.ingredients.filter(
      (i) => i.name && i.amount
    );
    if (validIngredients.length === 0) {
      toast.error("Please add at least one valid ingredient!");
      return;
    }

    try {
      // Dispatch createRecipe
      await dispatch(
        createRecipe({
          title: formData.title,
          description: formData.description,
          servings: Number(formData.servings),
          prep_minutes: formData.prep_minutes
            ? Number(formData.prep_minutes)
            : null,
          cook_minutes: formData.cook_minutes
            ? Number(formData.cook_minutes)
            : null,
          instructions: formData.instructions,
          ingredients: validIngredients.map((i) => ({
            name: i.name,
            amount: Number(i.amount),
            unit: i.unit,
          })),
        })
      ).unwrap(); // unwrap will throw if rejected

      toast.success("Recipe created successfully!");

      // Reset form
      setFormData({
        title: "",
        servings: 1,
        prep_minutes: "",
        cook_minutes: "",
        description: "",
        instructions: "",
        ingredients: [{ name: "", amount: "", unit: "g" }],
      });
      navigate("/YourRecipes");
    } catch (err) {
      toast.error(err || "Failed to create recipe");
    }
  };

  return (
    <div className="w-1/3 mx-auto">
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
            Create Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateOwnRecipe;
