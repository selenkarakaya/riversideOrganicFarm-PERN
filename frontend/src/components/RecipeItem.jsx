import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiTime, BiDish } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { deleteRecipe } from "../features/recipe/recipeSlice";
import { toast } from "react-toastify";
import RecipeForm from "./RecipeForm";

function RecipeItem({ recipe }) {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.userInfo?.id);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      dispatch(deleteRecipe(recipe.id))
        .unwrap()
        .then(() => toast.success("Recipe deleted successfully!"))
        .catch((err) => toast.error(err));
    }
  };

  const [isEditing, setIsEditing] = useState(false);

  return (
    <article className="border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg transition-shadow duration-300 bg-white">
      {isEditing && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div
            className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative shadow-lg 
                            transform transition-all duration-500 scale-95 opacity-0 animate-modalIn"
          >
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
            >
              X
            </button>
            <RecipeForm recipe={recipe} onSuccess={() => setIsEditing(false)} />
          </div>
        </div>
      )}

      {recipe.user_id === currentUserId && (
        <button
          onClick={handleDelete}
          className="mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      )}

      {recipe.user_id === currentUserId && !isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="mt-3 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
        >
          UPDATE
        </button>
      )}

      <Link
        to={`/recipes/${recipe.id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-green-600 rounded"
      >
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          {recipe.title}
        </h3>

        {/* Description as ordered list */}
        <div
          className="text-gray-600 mb-4 [&>ol>li]:mb-2 [&>ol]:list-decimal [&>ol]:pl-5"
          dangerouslySetInnerHTML={{ __html: recipe.description }}
        />

        {/* Info Row */}
        <div className="flex flex-wrap gap-4 mt-4 text-gray-700">
          <span className="flex items-center gap-1">
            <BiDish className="text-green-600" /> Servings:{" "}
            {recipe.servings || "N/A"}
          </span>
          <span className="flex items-center gap-1">
            <BiTime className="text-green-600" /> Prep:{" "}
            {recipe.prep_minutes || "N/A"} min
          </span>
          <span className="flex items-center gap-1">
            <BiTime className="text-green-600" /> Cook:{" "}
            {recipe.cook_minutes || "N/A"} min
          </span>
        </div>

        <ul>
          {recipe.Ingredients?.map((ing) => (
            <li key={ing.id}>
              {ing.name} - {ing.amount} {ing.unit}
            </li>
          ))}
        </ul>
      </Link>
    </article>
  );
}

export default RecipeItem;
