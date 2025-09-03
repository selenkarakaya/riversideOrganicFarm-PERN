import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, setUserInfo } from "./features/user/userSlice";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import HowItWorks from "./pages/HowItWorks";
import RecipePage from "./pages/RecipePage";
import OurRecipes from "./components/OurRecipes";
import YourRecipes from "./pages/YourRecipes";
import CreateOwnRecipe from "./components/CreateOwnRecipe";
import GiftCards from "./pages/GiftCards";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await dispatch(fetchUserProfile()).unwrap();
        dispatch(setUserInfo(result)); // store the user in redux
        console.log("Session found");
      } catch (err) {
        console.log("Session not found:", err.message);
      }
    };

    if (!userInfo) {
      checkAuth();
    }
  }, [dispatch, userInfo]);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/HowItWorks" element={<HowItWorks />} />
          <Route path="/Recipes" element={<RecipePage />} />
          <Route path="/OurRecipes" element={<OurRecipes />} />
          <Route path="/YourRecipes" element={<YourRecipes />} />
          <Route path="/CreateOwnRecipe" element={<CreateOwnRecipe />} />
          <Route path="/GiftCards" element={<GiftCards />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/Profile" element={<UserProfile />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;

/*
The purpose of checkAuth:
  1-To verify the user’s session with the backend when the page reloads or the app is re-mounted.
  2-To store the user information in Redux so the UI correctly reflects the login state.
*/
