import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipeById,
  clearSelectedProduct,
  setSelectedCategoryId,
  getRecipesByCategory,
} from "../features/recipe/recipeSlice";

import LoadingSpinner from "../components/LoadingSpinner";

const RecipeDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedRecipe, status, error } = useSelector(
    (state) => state.recipes
  );

  useEffect(() => {
    if (id) {
      dispatch(getRecipeById(id));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  const handleClick = (cat) => {
    dispatch(setSelectedCategoryId(cat.id));
    dispatch(getRecipesByCategory(cat.id));
    navigate(`/recipes/category/${cat.id}`);
  };
  if (status === "loading") return <LoadingSpinner />;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!selectedRecipe) return <p>Product not found.</p>;

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-8">
      <article className="flex flex-col md:flex-row gap-6">
        {/* Product details */}
        <section
          className="md:w-1/2 lg:w-3/5 flex flex-col"
          aria-labelledby="product-title"
        >
          <header className="mb-4">
            <h1
              id="product-title"
              className="text-2xl font-bold text-green-800"
            >
              {selectedRecipe.title}
            </h1>
            <p className="text-sm text-gray-500">
              {selectedRecipe.description}
            </p>
          </header>

          <p className="mb-4">{selectedRecipe.serving}</p>

          {/* Add to Cart Button */}
          <button>Add to Cart</button>
        </section>
      </article>

      {/* Scrollable list */}

      <ul>
        {selectedRecipe.Categories.map((cat) => (
          <li
            key={cat.id}
            className="hover:text-green-600  cursor-pointer  inline-block px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full mb-4"
            onClick={() => handleClick(cat)}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default RecipeDetailPage;
