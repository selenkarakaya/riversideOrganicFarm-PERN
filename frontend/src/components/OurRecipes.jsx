import RecipeResults from "../components/RecipeResults";
import RecipeSearch from "../components/RecipeSearch";
//import Alert from "../components/layouts/Alert";
import { Link } from "react-router-dom";

function OurRecipes() {
  return (
    <>
      <Alert />
      <RecipeSearch />
      <RecipeResults />
      <Link to="/CreateOwnRecipe">
        <p>CreateOwnRecipe</p>
      </Link>
    </>
  );
}

export default OurRecipes;
