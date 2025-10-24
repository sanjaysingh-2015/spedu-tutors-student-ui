import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/SpEduTutorLogo.png";
import ReactCountryFlag from "react-country-flag";
import { getWallet } from "../services/paymentService";
import {
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  UserIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

export default function NavBar() {
  const token = localStorage.getItem("spedu_token");
  const userRole = localStorage.getItem("userRole");
  const loginAt = localStorage.getItem("loginAt");
  const loggedInUser = localStorage.getItem("loggedInUser");
  const profileCompleted = localStorage.getItem("profileCompleted");
  const countryName = localStorage.getItem("country");
  const countryCode = localStorage.getItem("countryCode");
  const [wallet, setWallet] = useState({balance: 950.00 }); // demo balance, ideally fetched from backend
  const navigate = useNavigate();
  const location = useLocation();

  const initials = loggedInUser
    ? loggedInUser
        .split(" ")
        .map((word) => word[0].toUpperCase())
        .slice(0, 2)
        .join("")
    : "";

  useEffect(() => {
    const token = localStorage.getItem("spedu_token");
    const profileCompleted = localStorage.getItem("profileCompleted");
    if (token && profileCompleted === "false" && location.pathname !== "/profile-tab") {
      navigate("/profile-tab", { replace: true });
    }
  }, [navigate, location.pathname]);


  const handleLogout = () => {
    localStorage.removeItem("spedu_token");
    navigate("/login");
  };

  const commonCircle =
    "w-14 h-14 rounded-full flex flex-col items-center justify-center text-xs font-medium shadow-md transition-transform transform hover:scale-105";

  const isLoginPage = location.pathname === "/login";

  // 🎨 Dynamic color logic for wallet
  const getWalletColor = (balance) => {
    if (balance < 500) return "text-orange-500";
    if (balance < 1500)
      return "bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent";
    return "text-green-600";
  };

  // ✨ Motivational line (fun & dynamic)
  const getMotivation = () => {
    const quotes = [
      "Keep learning, superstar 🌟",
      "Your next big leap is one session away 🚀",
      "Knowledge is your superpower 🧠💪",
      "Invest in your mind, it pays the best interest 💰",
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const fetchWallet = async () =>  {
      const res = await getWallet();
      setWallet(res.data || {});
  }

  return (
    <div className="card flex justify-between items-center px-4 py-2 shadow-md bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl">
      {/* Left side: Logo + Navigation */}
      <div className="flex items-center space-x-4">
        <Link to={token ? "/dashboard" : "/login"}>
          <img src={logo} alt="spEdu Tutors" className="h-14 mr-4 hover:scale-105 transition-transform" />
        </Link>

        {!isLoginPage && profileCompleted === "true" && (
          <div className="flex space-x-4">
            <Link
              to="/profile"
              className={`${commonCircle} bg-blue-100 text-blue-700 hover:bg-blue-200`}
            >
              <UserIcon className="w-6 h-6" />
              <span>Me</span>
            </Link>

            <Link
              to="/my-sessions"
              className={`${commonCircle} bg-pink-100 text-pink-700 hover:bg-pink-200`}
            >
              <CalendarDaysIcon className="w-6 h-6" />
              <span>Sessions</span>
            </Link>

            <Link
              to="/classes"
              className={`${commonCircle} bg-yellow-100 text-yellow-700 hover:bg-yellow-200`}
            >
              <BookOpenIcon className="w-6 h-6" />
              <span>Courses</span>
            </Link>
          </div>
        )}
      </div>

      {/* Right side: Wallet + Profile + Logout */}
      <div className="flex items-center space-x-4">
        {!isLoginPage && token && (
          <>
            {/* Wallet Display */}
            <div className="text-sm text-center">
              <p className="text-[0.75rem] italic text-gray-600">
                {getMotivation()}
              </p>
            </div>

            {/* User info */}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center space-y-1 focus:outline-none hover:opacity-80 transition"
            >
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm shadow-sm">
                {initials}
              </span>
              <span className="text-[0.9rem] text-blue-800 flex items-center space-x-1">
                <ReactCountryFlag
                  countryCode={countryCode}
                  svg
                  style={{
                    width: "1.35em",
                    height: ".75em",
                    borderRadius: "3px",
                  }}
                  title={countryName}
                />
                <span>{loggedInUser}</span>
              </span>
              <span className="text-[0.65rem] text-green-800">
                🕒 {loginAt}
              </span>
            </button>
          </>
        )}

        {!isLoginPage && !token && (
          <Link
            to="/login"
            className={`${commonCircle} bg-blue-100 text-blue-700 hover:bg-blue-200`}
          >
            <ArrowLeftOnRectangleIcon className="w-6 h-6" />
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}
