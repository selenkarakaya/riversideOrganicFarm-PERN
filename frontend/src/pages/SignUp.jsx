import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/user/userSlice";
import { useNavigate, Link } from "react-router-dom";
import arrowRightIcon from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { full_name, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    dispatch(registerUser({ full_name, email, password }));
  };

  const { userInfo, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      <header>
        <p className="text-2xl my-2 text-center font-mono">
          Welcome to discover us!
        </p>
        <p className="text-center">
          Become a member — don’t miss out on deals, offers, discounts and bonus
          vouchers.
        </p>
      </header>

      <form
        className="md:w-3/4 flex flex-col justify-center items-center my-6"
        onSubmit={onSubmit}
      >
        {/* Name */}
        <input
          type="text"
          className="md:w-1/2 bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white"
          placeholder="Full Name"
          name="full_name"
          value={full_name}
          onChange={onChange}
          required
        />

        {/* Email */}
        <input
          type="email"
          className="md:w-1/2 bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />

        {/* Password */}
        <div className="md:w-1/2 relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
          <img
            src={visibilityIcon}
            alt="show password"
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>

        {/* Confirm Password */}
        <div className="md:w-1/2 relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="w-full bg-indigo-100 text-indigo-600 border border-indigo-800 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            required
          />
          <img
            src={visibilityIcon}
            alt="show password"
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          />
        </div>

        {/* Submit */}
        <div className="flex justify-center items-center space-x-3 mt-3">
          <button
            type="submit"
            className="flex justify-center items-center space-x-2 p-2 bg-darkGreen rounded-2xl hover:bg-greens hover:text-white disabled:opacity-50"
            disabled={status === "loading"}
          >
            <p className="text-xl">
              {status === "loading" ? "Registering..." : "Sign Up"}
            </p>
            <img src={arrowRightIcon} alt="arrow right" className="w-6 h-6" />
          </button>
        </div>
      </form>

      <Link to="/SignIn" className="my-2 hover:scale-110">
        Sign In Instead
      </Link>
    </div>
  );
}

export default SignUp;
