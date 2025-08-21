import RecipeResults from "../components/RecipeResults";
import RecipeSearch from "../components/RecipeSearch";
//import Alert from "../components/layouts/Alert";
import { Link } from "react-router-dom";
import Title from "../assets/Title";
import RecipeForm from "../components/RecipeForm";

function RecipePage() {
  Title("Easy, Delicious & Fast Recipes");
  let user = true;
  return (
    <>
      <div className="flex flex-col items-center mb-10 hover:scale-110">
        <h1 className="text-2xl">Recipes</h1>
        <p className="text-xl">
          You can either use our recipes or your own recipe • It's up to you!
        </p>
      </div>
      <div className="flex lg:flex-row flex-col items-center justify-center lg:w-4/5 m-auto space-x-4 mb-10">
        <div className="xl:flex-1 w-full border-solid border-2 border-darkGreen xl:w-4/5 boxShadow p-3 hover:scale-105">
          <RecipeSearch />
        </div>
        <div className="xl:flex-1 w-full flex flex-col space-y-4 items-center p-2 border-solid border-2 border-darkGreen xl:w-4/5 boxShadow hover:scale-105">
          <p className="text-xl">
            Don't you select to use our recipes or you don't like our delicious
            recipes?
          </p>
          {user ? (
            <Link to="/CreateOwnRecipe">
              <button className=" bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-4 rounded">
                Click&Create Own Recipe
              </button>
            </Link>
          ) : (
            <>
              <p>
                If you would like to display your recipes or create own recipes
                and order it, please
              </p>
              <div className="flex justify-center items-center">
                <Link
                  to="/SignIn"
                  className="my-2 mx-2 py-1 px-4 bg-mediumGreen  rounded-lg hover:bg-lightOrange hover:text-white"
                >
                  Sign In
                </Link>
                or
                <Link
                  to="/SignUp"
                  className="my-2 mx-2 py-1 px-4 bg-lightOrange  rounded-lg hover:bg-greens hover:text-white"
                >
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      <RecipeResults />
      <RecipeForm />
    </>
  );
}

export default RecipePage;
