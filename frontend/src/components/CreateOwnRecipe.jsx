function CreateOwnRecipe() {
  return (
    <div className="w-1/3 mx-auto">
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="recipeName"
            >
              Recipe Name
            </label>
            <input
              className=" block w-full bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="recipeName"
              type="text"
              placeholder="Name your recipe"
              maxLength="32"
              minLength="3"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="servingSize"
            >
              Serving Size
            </label>
            <input
              className="appearance-none block w-full bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="servingSize"
              type="number"
              placeholder="2"
              min="1"
              max="10"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap  mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="recipeIngredients"
            >
              Ingredients
            </label>
            <textarea
              id="recipeIngredients"
              name="recipeIngredients"
              rows="3"
              className="block w-full rounded-md border-0 py-1.5 bg-indigo-100 text-indigo-600  border-indigo-800 focus:bg-white shadow-sm ring-1 sm:text-sm sm:leading-6"
              required
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>
        <div className="flex flex-wrap  mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="recipeInstructions"
            >
              Instructions
            </label>
            <textarea
              id="recipeInstructions"
              name="recipeInstructions"
              rows="3"
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1  bg-indigo-100 text-indigo-600  border-indigo-800 focus:bg-white  sm:text-sm sm:leading-6"
              required
            ></textarea>
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>
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
