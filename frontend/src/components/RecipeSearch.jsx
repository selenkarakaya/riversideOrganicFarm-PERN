import { useState, useContext } from "react";

function RecipeSearch() {
  return (
    <>
      <h1>api seacrh islemi yapilacak</h1>
      <div className="flex flex-col justify-center items-center mb-5">
        <form className="w-full max-w-sm border-b border-greens">
          <div className="flex items-center py-2">
            <input
              className="bg-transparent border-none w-full text-mediumOrange text-2xl mr-3 py-1 px-2 focus:outline-none"
              type="text"
              placeholder="Search recipe"
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-4 rounded"
              type="submit"
            >
              Go
            </button>
            {/* If there is any recipe , display clear button. Otherwise don't
            show it. */}
            {/* {recipes.length > 0 && (
              <div>
                <button
                  className="flex-shrink-0 border-transparent border-4 text-greens hover:text-teal-700 text-sm py-1 px-2 rounded"
                  type="button"
                >
                  Clear
                </button>
              </div>
            )} */}
            <button
              className="flex-shrink-0 border-transparent border-4 text-greens hover:text-teal-700 text-sm py-1 px-2 rounded"
              type="button"
            >
              Clear
            </button>
          </div>
        </form>
        <p className="text-red-500 text-xs italic text-center w-full">
          Please fill out this field such as soup, wedding soup, chicken, beef,
          kebab etc.
        </p>
      </div>
    </>
  );
}

export default RecipeSearch;
