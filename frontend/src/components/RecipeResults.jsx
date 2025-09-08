import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getRecipes } from "../features/recipe/recipeSlice";
import RecipeItem from "./RecipeItem";
import LoadingSpinner from "./LoadingSpinner";
import ExpandableText from "../utils/ExpandableText";
import { paginate } from "../utils/pagination";
//import Spinner from "../components/layouts/Spinner";
//import RecipeItem from "./RecipeItem";

import { BiBowlHot } from "react-icons/bi";

function RecipeResults() {
  const dispatch = useDispatch();
  const {
    items: recipes,
    status,
    error,
  } = useSelector((state) => state.recipes);
  useEffect(() => {
    if (status === "idle") {
      dispatch(getRecipes());
    }
  }, [dispatch, status]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;
  const currentItems = paginate(recipes, currentPage, itemsPerPage);

  const handlePageChange = (idx) => {
    setCurrentPage(idx);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (recipes.length === 0) {
    return (
      <main className="text-center text-gray-600 mt-10">
        <h1 className="text-xl mb-2">😞 Oops! No recipe to show right now.</h1>
        <p>Try checking back later or explore other categories 🌿</p>
      </main>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-6"
        role="alert"
      >
        <strong className="font-bold">Oops! </strong>
        <span className="block sm:inline">Something went wrong: {error}</span>
      </div>
    );
  }

  return (
    <main className="my-8 max-w-screen-xl mx-auto px-4">
      {/* Category Info */}
      {/* <section
        aria-labelledby="category-title"
        className="flex flex-col items-center text-center max-w-xl mx-auto mb-10"
      >
        <h1 id="category-title" className="text-2xl font-bold mb-4">
          {selectedCategory?.name}
        </h1>
        <ExpandableText text={selectedCategory?.description} limit={120} />
      </section> */}

      {/* Recipe Grid */}
      <section
        aria-label="Product list"
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {currentItems.map((recipe) => (
          <RecipeItem key={recipe.id} recipe={recipe} />
        ))}
      </section>

      {/* Pagination */}
      {Math.ceil(recipes.length / itemsPerPage) > 1 && (
        <nav
          className="flex justify-center space-x-3 mt-6"
          aria-label="Pagination"
        >
          {[...Array(Math.ceil(recipes.length / itemsPerPage))].map(
            (_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx)}
                className={`px-3 py-1 rounded ${
                  currentPage === idx
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                aria-current={currentPage === idx ? "page" : undefined}
              >
                {idx + 1}
              </button>
            )
          )}
        </nav>
      )}
    </main>
  );
}

export default RecipeResults;
