import React, { useState } from "react";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import { GoCommentDiscussion } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logoutUser } from "../features/user/userSlice";

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [changeDetails, setChangeDetails] = useState(false);

  const { userInfo } = useSelector((state) => state.user);

  const firstName =
    userInfo.full_name.split(" ")[0].charAt(0).toUpperCase() +
    userInfo.full_name.split(" ")[0].slice(1).toLowerCase();

  const handleLogout = () => {
    if (!userInfo) return;
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
    <div className="mb-5">
      <header className="flex items-center space-x-8">
        <p className="pl-2 text-xl">My Account • </p>
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
        <p
          className="cursor-pointer text-greens text-xl"
          onClick={() => {
            //changeDetails && onSubmit();
            setChangeDetails((prevState) => !prevState);
          }}
        >
          {changeDetails ? "Done • " : "Change Details • "}
        </p>
        <div className="flex items-center bg-mediumOrange rounded-lg px-2 py-2 space-x-1 hover:scale-105 hover:bg-greens hover:text-mediumOrange">
          <FiLogOut style={{ color: "white", fontSize: "1.2rem" }} />
          <button
            type="button"
            className=" text-white animate-bounce"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </header>
    </div>
  );
}

export default UserProfile;
