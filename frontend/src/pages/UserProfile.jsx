import React, { useState } from "react";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import { GoCommentDiscussion } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logoutUser, updateProfile } from "../features/user/userSlice";
import UserInfo from "../components/UserInfo";
import RecipeForm from "../components/RecipeForm";

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);
  const [selectedTab, setSelectedTab] = useState("orders"); // 'profile' | 'orders'
  const handleLogout = () => {
    if (!userInfo) return;
    const firstName =
      userInfo?.full_name.split(" ")[0].charAt(0).toUpperCase() +
      userInfo?.full_name.split(" ")[0].slice(1).toLowerCase();
    toast(`Goodbye ${firstName} 👋`);
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate("/SignIn");
      })
      .catch((err) => {
        toast.error("Logout failed. Please try again.");
      });
  };

  return (
    <div className="flex flex-col  md:items-center  mx-auto mt-10 p-6 gap-6 shadow rounded">
      <header className="flex items-center justify-center space-x-8 font-semibold w-full ">
        <p className="pl-2 text-xl">My Account • </p>
        <button
          onClick={() => setSelectedTab("profile")}
          aria-current={selectedTab === "profile" ? "page" : undefined}
          className={`px-4 py-2 rounded-md cursor-pointer w-full md:w-auto text-center ${
            selectedTab === "profile"
              ? "bg-terracotta text-white"
              : "bg-gray-200 text-gray-700 border border-terracotta"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setSelectedTab("orders")}
          aria-current={selectedTab === "orders" ? "page" : undefined}
          className={`px-4 py-2 rounded-md cursor-pointer w-full md:w-auto text-center ${
            selectedTab === "orders"
              ? "bg-terracotta text-white"
              : "bg-gray-200 text-gray-700 border border-terracotta"
          }`}
        >
          Orders
        </button>
        <Link
          to="/Feedback"
          className="text-xl text-greens flex items-center space-x-2"
        >
          <GoCommentDiscussion />
          <p>Help us improve •</p>
        </Link>
        <Link
          to="/Contact"
          className="text-xl text-greens flex items-center space-x-2"
        >
          <BiEditAlt />
          <p> Contact •</p>
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="text-terracotta font-bold border-b border-terracotta px-4 py-2 hover:scale-105 cursor-pointer w-full md:w-auto text-center"
        >
          Logout
        </button>
      </header>

      {/* Content Section */}
      <section aria-labelledby="profile-heading" className="w-full md:w-3/4">
        {selectedTab === "profile" && <UserInfo />}
        {selectedTab === "orders" && <RecipeForm />}
      </section>
    </div>
  );
}

export default UserProfile;
