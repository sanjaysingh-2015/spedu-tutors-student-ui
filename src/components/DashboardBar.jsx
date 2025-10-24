// src/components/DashboardBar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/solid";

const DashboardBar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-blue-600 transition-all"
      >
        <HomeIcon className="w-5 h-5 mr-2" />
        Dashboard
      </button>
    </div>
  );
};

export default DashboardBar;
