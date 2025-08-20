import { Link } from "react-router-dom";
import { RiUserHeartLine } from "react-icons/ri";
import { IoIosMailUnread } from "react-icons/io";
import Logo from "../assets/images/LOGO3.png";

function Navbar() {
  return (
    <div className="md:p-7">
      <div className="flex flex-col lg:flex-row lg:justify-between items-center justify-center ">
        <div className="flex items-center">
          <Link to="/">
            {/* <h1 className="text-xl">Riverside</h1> */}
            <img src={Logo} alt="GiftRedeem" className="w-24 h-24" />
          </Link>
        </div>
        <div className="space-x-4 flex ">
          <Link
            to="/"
            className="hover:bg-lightGreen md:p-7 hover:scale-105 invisible md:visible"
          >
            Home
          </Link>

          <Link to="/HowItWorks" className="hover:bg-lightGreen  md:p-7">
            How It Works
          </Link>

          <Link to="/Recipes" className="hover:bg-lightGreen  md:p-7">
            Recipes
          </Link>
          <Link to="/YourRecipes" className="hover:bg-lightGreen  md:p-7">
            Your Recipes
          </Link>

          <Link to="/GiftCards" className="hover:bg-lightGreen  md:p-7">
            Gift Cards
          </Link>
          <Link
            to="/OurRecipeBoxes"
            className="hover:bg-lightGreen md:p-7 hover:scale-105 "
          >
            Choose Your Box
          </Link>
        </div>
        <div className="flex space-x-3 items-center">
          <Link
            to="/Profile"
            className="flex items-center space-x-1 px-3 py-1 hover:bg-greens hover:text-white rounded-lg"
          >
            <RiUserHeartLine />
            <p>My account</p>
          </Link>
          <Link to="/Contact" className="text-greens  py-2 hover:scale-110">
            <IoIosMailUnread style={{ fontSize: "1.5rem" }} />
          </Link>
          <div>
            <button className=" text-white  bg-mediumOrange px-3 py-1 hover:scale-105 hover:bg-darkGreen rounded-lg mr-1">
              <Link to="/SignIn">Sign in</Link>
            </button>
            <button className=" text-white rounded-lg bg-mediumOrange px-3 py-1 hover:scale-105 hover:bg-darkGreen">
              <Link to="/SignUp">Register</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
