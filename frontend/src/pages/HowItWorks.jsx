import { Link } from "react-router-dom";

import works_Meal from "../assets/images/works_Meal.jpg";
import works_Box from "../assets/images/works_Box.jpg";
import works_Cook from "../assets/images/works_Cook.png";
import works_Delivery from "../assets/images/works_Delivery.png";

import Title from "../assets/Title";

function HowItWorks() {
  Title("How Does Riverside Farm Works?");
  return (
    <section id="howWorks">
      <div
        id="headerHowItWork"
        className="flex flex-col items-center space-y-5 my-10"
      >
        <h1 className="text-4xl">How Riverside Farm works?</h1>
        <h2 className="text-xl">
          Riverside is the easy way to cook delicious meals at home.
        </h2>
        <h2>
          Choose your recipes or create your own recipes • Pre-measured
          ingredients for less waste • Delivered safely to your door
        </h2>
      </div>
      <div className="flex md:flex-row flex-col md:space-x-2">
        <div className="md:w-1/2 flex justify-center">
          <img className="h-96" src={works_Box} alt="works_Box" />
        </div>
        <div className="md:w-1/2 w-full h-96 flex flex-col md:items-start items-center justify-center space-y-6 md:mr-20">
          <h1 className="text-3xl">1. Pick a plan</h1>
          <p>
            Whether cooking for yourself or your household, we have a flexible
            plan to match your lifestyle. You can customize your plan size from
            week to week besides you can choose number of people and recipes.
            Need to cancel, change meals, or skip a week? Not a problem.
          </p>

          <Link
            to="/OurRecipeBoxes"
            className="bg-darkGreen bg-opacity-80 hover:bg-darkGreen w-10/12 p-4 rounded-lg text-center"
          >
            Select Box
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row-reverse">
        <div className="md:w-1/2 flex justify-center">
          <img className="h-96" src={works_Meal} alt="works_Meal" />
        </div>
        <div className="md:w-1/2 h-96 flex flex-col md:items-start items-center justify-center space-y-6 md:ml-20">
          <h1 className="text-3xl">2. Choose your meals</h1>
          <p>
            Whether selecting for your own recipes or our recipes, we have a
            flexible options to match your lifestyle. Write your recipes and add
            your box!
          </p>
          <Link
            to="/OurRecipeBoxes"
            className="bg-darkGreen bg-opacity-80 hover:bg-darkGreen w-10/12 p-4 rounded-lg text-center"
          >
            Select Box
          </Link>
        </div>
      </div>
      <div className="flex md:flex-row flex-col md:space-x-2">
        <div className="md:w-1/2 flex justify-center">
          <img className="h-96" src={works_Delivery} alt="works_Delivery" />
        </div>
        <div className="md:w-1/2 w-full h-96 flex flex-col items-center  md:items-start md:justify-center space-y-6 md:mr-20">
          <h1 className="text-3xl">3. Fresh ingredients delivered</h1>
          <p>
            We deliver your step-by-step recipes and all the fresh pre-portioned
            ingredients you need, straight to your door. Delivery times are from
            8 am to 8 pm on the day you choose. If you’re not at home, don’t
            worry! You can always add special delivery instructions to your
            account. You can also change your delivery day online if you need
            to.
          </p>
          <Link
            to="/OurRecipeBoxes"
            className="bg-darkGreen bg-opacity-80 hover:bg-darkGreen w-10/12 p-4 rounded-lg text-center"
          >
            Select Box
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row-reverse">
        <div className="md:w-1/2 flex justify-center">
          <img className="h-96" src={works_Cook} alt="works_Cook" />
        </div>
        <div className="md:w-1/2 h-96 flex flex-col md:items-start items-center justify-center space-y-6 md:ml-20">
          <h1 className="text-3xl">4. Cook, eat, enjoy!</h1>
          <p>
            Welcome to a world where dinner is always planned, simple, and
            delicious!
            <i className="fa-solid fa-face-grin-hearts fa-bounce text-mediumOrange ml-2"></i>
          </p>
          <p>
            In your box, you'll receive step-by-step recipe cards, an insulated
            cool bag with ice packs containing all your meat, prepped veg and
            dairy products, and all the portioned out ingredients you need to
            easily create delicious dinners. The only ingredients you need at
            home are some basic pantry items, which will be listed on the recipe
            card. You can also check which items you'll need in advance when
            selecting your meals.
          </p>
          <Link
            to="/OurRecipeBoxes"
            className="bg-darkGreen bg-opacity-80 hover:bg-darkGreen w-10/12 p-4 rounded-lg text-center"
          >
            Select Box
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
