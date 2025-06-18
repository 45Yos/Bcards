import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import About from "./Pages/About.page";
import NavbarHeader from "./components/Navbar";
import ErrorPage from "./Pages/Error.page";
import SignInPage from "./Pages/SignIn.page";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SignUpPage from "./Pages/SignUp.page";
import ProfilePage from "./Pages/Profile.page";
import CreateCardPage from "./Pages/CreateCard.page";
import { useEffect, useState } from "react";
import MyCardsPage from "./Pages/MyCards.page";
import LikedCardsPage from "./Pages/LikedCards.page";
import CrmPage from "./Pages/Crm.page";
import { Accessibility } from "accessibility";

const MainApp = () => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    new Accessibility();
  }, []);

  return (
    <BrowserRouter>
      <NavbarHeader onSearch={setSearchTerm} />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<App searchTerm={searchTerm} />} />
        <Route path="/home" element={<App searchTerm={searchTerm} />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/createCard" element={<CreateCardPage />} />
        <Route path="/myCards" element={<MyCardsPage />} />
        <Route path="/likedCards" element={<LikedCardsPage />} />
        <Route path="/crm" element={<CrmPage />} />

        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainApp;
