import { useEffect, useState } from "react";

import { toast } from "react-toastify";
//import Spinner from "../components/layouts/Spinner";
//import ListingItem from "../components/ListingItem";
import { useNavigate, Link } from "react-router-dom";

import Title from "../assets/Title";

function YourRecipes() {
  Title("Your Own Recipes");

  return (
    <div className="flex flex-col items-center w-1/2 bg-indigo-100 mx-auto p-10 space-y-5 mb-96">
      <h1>userin kendi yazdigi recipeler</h1>
      <p>Hi there!</p>
      <p>
        Want to save the recipes that you love? Just add them on the Recipes
        page and it will show up here.
      </p>
      <Link
        to="/SignIn"
        className="my-2 mx-2 py-1 px-4 bg-indigo-800 text-white  rounded-lg hover:bg-greens hover:text-white"
      >
        Browse now
      </Link>
    </div>
  );
}
export default YourRecipes;
