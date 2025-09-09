import RecipeResults from "../components/RecipeResults";
import RecipeSearch from "../components/RecipeSearch";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Title from "../assets/Title";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/category/categorySlice";
import {
  setSelectedCategoryId,
  getRecipesByCategory,
} from "../features/recipe/recipeSlice";

function CategoriesSidebar() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.items);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // const handleClick = (cat) => {
  //   dispatch(setSelectedCategoryId(cat.id));
  //   dispatch(getRecipesByCategory(cat.id));
  //   setIsOpen(false);
  // };

  const navigate = useNavigate();

  const handleClick = (cat) => {
    dispatch(setSelectedCategoryId(cat.id));
    dispatch(getRecipesByCategory(cat.id));
    navigate(`/recipes/category/${cat.id}`);
    setIsOpen(false);
  };
  return (
    <>
      {/* Categories Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-terracotta text-white px-4 py-2 rounded shadow hover:bg-green-700 z-50"
      >
        Categories
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <h2 className="text-xl font-bold mb-4">Categories</h2>

          {/* Scrollable list */}
          <ul className="flex-1 overflow-y-auto scrollbar-none">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="hover:text-green-600 cursor-pointer"
                onClick={() => handleClick(cat)}
              >
                {cat.name}
              </li>
            ))}
          </ul>

          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </aside>
    </>
  );
}

export default CategoriesSidebar;
