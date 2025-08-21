import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

function App() {
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
