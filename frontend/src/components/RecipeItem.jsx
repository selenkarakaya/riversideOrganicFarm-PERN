import { Link } from "react-router-dom";
import { BiTime, BiDish } from "react-icons/bi";

function RecipeItem({ recipe }) {
  return (
    <article className="border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg transition-shadow duration-300 bg-white">
      <Link
        to={`/products/${recipe.id}`}
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
      </Link>
    </article>
  );
}

export default RecipeItem;
