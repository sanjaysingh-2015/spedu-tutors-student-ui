import React, {useEffect, useState} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/SpEduTutorLogo.png";
import ReactCountryFlag from "react-country-flag";
import {
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  UserIcon,
  BuildingLibraryIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  ClockIcon,
  DocumentTextIcon,
  ClipboardDocumentIcon,
  MapPinIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline'

export default function NavBar() {
  const token = localStorage.getItem("spedu_token");
  const userRole = localStorage.getItem("userRole");
  const loginAt = localStorage.getItem("loginAt");
  const loggedInUser = localStorage.getItem("loggedInUser");
  const profileCompleted = localStorage.getItem('profileCompleted');
  const countryName = localStorage.getItem('country');
  const countryCode = localStorage.getItem('countryCode');
  const [countryFlag, setCountryFlag] = useState('');
  const initials = loggedInUser
    ? loggedInUser
        .split(" ")
        .map(word => word[0].toUpperCase())
        .slice(0, 2)
        .join("")
    : "";
  const navigate = useNavigate();
  const location = useLocation();

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
    "w-14 h-14 rounded-full flex flex-col items-center justify-center text-xs font-medium shadow-md transition-colors";

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="card flex justify-between items-center px-4 py-2">
      {/* Logo + Navigation */}
      <div className="flex items-center space-x-4">
        <Link to={token ? "/search" : "/login"}>
          <img src={logo} alt="spEdu Tutors" className="h-16 mr-4" />
        </Link>

        {/* Hide navigation links on login page */}
        {!isLoginPage && (
          <div className="flex space-x-4">
            {profileCompleted === "true" ? (
              <>
                <Link to="/profile" className={`${commonCircle} bg-blue-100 text-blue-700 hover:bg-blue-200`}>
                  <UserIcon className="w-6 h-6" />
                  <span>Me</span>
                </Link>
                <Link to="/search" className={`${commonCircle} bg-blue-100 text-blue-700 hover:bg-blue-200`}>
                  <UserIcon className="w-6 h-6" />
                  <span>Tutors</span>
                </Link>
                <Link to="/payment" className={`${commonCircle} bg-blue-100 text-blue-700 hover:bg-blue-200`}>
                  <BanknotesIcon className="w-6 h-6" />
                  <span>Payment</span>
                </Link>
              </>) : <></>}
          </div>
        )}
      </div>

      {/* Right side buttons (Logout + Profile Info) */}
      <div className="flex items-center space-x-4">
        {!isLoginPage && token && (
          <>
            <button
              onClick={handleLogout}
              className="flex flex-col items-center space-y-1 focus:outline-none hover:opacity-80 transition"
            >
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                {initials}
              </span>
              <span className="text-[1.0rem] text-blue-700 text-center">
              <ReactCountryFlag
              countryCode={countryCode}
              svg
              style={{
                width: '1.35em',
                height: '.75em',
                borderRadius: '3px',
              }} title={countryName} />
              {loggedInUser}
              </span>
              <span className="text-[0.5rem] text-green-800 text-center">
                Logged in at: {loginAt}
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
