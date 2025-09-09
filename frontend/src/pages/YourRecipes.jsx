import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Title from "../assets/Title";
import { getMyRecipes } from "../features/recipe/recipeSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import RecipeItem from "../components/RecipeItem";
import RecipeForm from "../components/RecipeForm";

function YourRecipes() {
  Title("Your Own Recipes");
  const dispatch = useDispatch();

  const { items, status, error } = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getMyRecipes());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  if (status === "loading") return <LoadingSpinner />;

  return (
    <div className="flex flex-col items-center w-3/4 bg-indigo-100 mx-auto p-10 space-y-5 mb-96">
      <h1 className="text-2xl font-bold">Your Own Recipes</h1>

      <button
        onClick={openModal}
        className="px-4 py-2 bg-darkGreen text-white rounded hover:bg-greens"
      >
        Create Your Own Recipe
      </button>

      {showModal && (
        <>
          {/* Blurring b arka plan - transition ile */}
          <div className="fixed inset-0 backdrop-blur-sm transition-all duration-500 z-40 pointer-events-none"></div>
          {/* Modal - fade in */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative shadow-lg 
                            transform transition-all duration-500 scale-95 opacity-0 animate-modalIn"
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-700 font-bold text-xl"
              >
                ✕
              </button>

              {/* Modal content */}
              <RecipeForm />
            </div>
          </div>
        </>
      )}

      {items.length === 0 ? (
        <>
          <p className="text-gray-700">
            Hi there! Want to save the recipes that you love? Just add them on
            the Recipes page and they will show up here.
          </p>
          <Link
            to="/recipes"
            className="my-2 mx-2 py-1 px-4 bg-indigo-800 text-white rounded-lg hover:bg-greens hover:text-white"
          >
            Browse now
          </Link>
        </>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {items.map((recipe) => (
            <RecipeItem key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default YourRecipes;
