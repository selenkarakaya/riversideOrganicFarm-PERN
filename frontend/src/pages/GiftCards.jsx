import { Link } from "react-router-dom";
import Title from "../assets/Title";
import gift_redeem from "../assets/images/gift_redeem.png";
import GiftForm from "../components/GiftForm";

function GiftCards() {
  Title("Riverside Farm|| Gift Cards");
  return (
    <div>
      <section>
        <div className="gift-main  h-[25rem] bg-center bg-cover flex flex-col justify-center items-center space-y-12">
          <h1 className="w-44 text-center md:text-3xl text-xl">
            Give the gift of home-cooked meals
          </h1>
          <p className="md:text-2xl text-md">
            We've made gifting easy, so you can focus on spoiling your family
            and friends.
          </p>
          <div className="space-x-10">
            <button className="border-2 border-lightOrange bg-lightOrange px-9 py-3 hover:opacity-70 hover:text-white">
              <Link to="/GiftCards#buyGiftCard">Buy gift card</Link>
            </button>
            <button className="border-2 border-mediumGreen text-lightOrange px-9 py-3 hover:opacity-70 hover:text-white">
              <Link to="/GiftCards#redeem">Redeem gift card</Link>
            </button>
          </div>
        </div>
      </section>
      <section id="buyGiftCard">
        <GiftForm />
      </section>
      <section id="redeem">
        <div className="flex bg-lightGreen md:h-60 mt-10">
          <div className="w-1/3 mt-10 flex justify-end items-center">
            <img className="h-56 w-80" src={gift_redeem} alt="gift_redeem" />
          </div>
          <div className="w-1/2 md:w-1/4 mt-10 space-y-6 flex flex-col">
            <h1 className="text-center text-xl">Redeem a gift card</h1>
            <p className="text-center">
              Received a gift card? Lucky you! Redeem it here and get ready for
              some delicious home cooking.
            </p>
            <div className="flex space-x-4 justify-center">
              <input
                type="text"
                name="code"
                id="code"
                autoComplete="given-code"
                placeholder="SK-A9528"
                className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <Link to="/OurRecipeBoxes" className=" w-1/2">
                <button className=" bg-darkGreen p-4 rounded-2xl hover:bg-greens hover:text-white">
                  Redeem
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="gift-slogan  h-96 bg-cover bg-no-repeat bg-center mt-5"></div>
      </section>
    </div>
  );
}

export default GiftCards;
