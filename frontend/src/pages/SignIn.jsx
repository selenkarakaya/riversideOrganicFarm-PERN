import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import arrowRightIcon from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { Navigate } from "react-router-dom";

function SignIn() {
  //if (!auth.currentUser) {
  return (
    <>
      <div className="flex flex-col justify-center items-center mx-auto">
        <header>
          <p className="text-2xl my-2 text-center font-mono">Welcome Back!</p>
          <p className="text-center">
            Become a member — don’t miss out on deals, offers, discounts and
            bonus vouchers.
          </p>
        </header>
        <form className="w-3/4 flex flex-col justify-center items-center my-6">
          <input
            type="email"
            className="w-1/2 bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            placeholder="Email"
            id="email"
          />

          <div className="passwordInputDiv w-1/2">
            <input
              type={"password"}
              className="w-full bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="Password"
              id="password"
            />
            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              //onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <Link to="/forgot-password" className="w-1/2 ">
            <p className="text-right">Forgot Password</p>
          </Link>
          <div className="flex justify-center items-center space-x-3 mt-3">
            <button className="flex justify-center items-center space-x-2 p-2 bg-darkGreen rounded-2xl hover:bg-greens hover:text-white">
              <p className="text-xl">Sign In</p>
              <img src={arrowRightIcon} alt="arrow right" className="w-6 h-6" />
            </button>
            <span>or OAuth</span>
          </div>
        </form>

        <Link to="/SignUp" className="my-2 hover:scale-110">
          Sign Up Instead
        </Link>
      </div>
    </>
  );
} //else {
//return <Navigate to="/Profile" replace={true} />;

export default SignIn;
