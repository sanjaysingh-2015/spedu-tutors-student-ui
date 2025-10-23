import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getProfile } from "../services/profileService";
import { getMyClasses } from "../services/classService";
import { useNavigate, Link } from "react-router-dom";
import {
  SparklesIcon,
  UserIcon,
  AcademicCapIcon,
  BanknotesIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    getProfile().then((res) => {
      if (!res.data || res.data.profileStatus === "INITIATE") {
        navigate("/profile");
      } else {
        setProfile(res.data);
        localStorage.setItem("studentId", res.data.code);
        fetchClasses(res.data.code, new Date());
      }
    });
  }, []);

  const fetchClasses = async (studentId, date) => {
    try {
      const res = await getMyClasses(studentId);
      // Filter classes for the selected date
      const selectedDateStr = date.toISOString().split("T")[0];
      const filtered = res.data.filter(
        (cls) => cls.startDate === selectedDateStr
      );
      setClasses(filtered);
    } catch (err) {
      console.error("Failed to fetch classes:", err);
    }
  };

  const changeDay = (offset) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + offset);
    setSelectedDate(newDate);
    const studentId = localStorage.getItem("studentId");
    fetchClasses(studentId, newDate);
  };

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const tiles = [
    {
      title: "Find Tutors",
      icon: <UserIcon className="w-10 h-10 text-blue-600" />,
      link: "/search",
      color:
        "from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100",
    },
    {
      title: "My Classes",
      icon: <AcademicCapIcon className="w-10 h-10 text-indigo-600" />,
      link: "/my-classes",
      color:
        "from-indigo-100 to-indigo-50 hover:from-indigo-200 hover:to-indigo-100",
    },
    {
      title: "Payments",
      icon: <BanknotesIcon className="w-10 h-10 text-green-600" />,
      link: "/payment",
      color:
        "from-green-100 to-green-50 hover:from-green-200 hover:to-green-100",
    },
    {
      title: "Explore Courses",
      icon: <SparklesIcon className="w-10 h-10 text-purple-600" />,
      link: "/classes",
      color:
        "from-purple-100 to-purple-50 hover:from-purple-200 hover:to-purple-100",
    },
  ];

  return (
    <Layout>
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome, {profile?.firstName || "Student"} 👋
              </h1>
              <p className="text-gray-500 mt-1">
                Here’s what’s happening in your learning journey today.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/profile"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow hover:shadow-lg hover:from-indigo-600 hover:to-blue-600 transition-all"
              >
                <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
                View Profile
              </Link>
            </div>
          </div>

          {/* Tiles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {tiles.map((tile, idx) => (
              <Link
                key={idx}
                to={tile.link}
                className={`rounded-2xl shadow-md bg-gradient-to-br ${tile.color} p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-transform transform hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className="mb-3">{tile.icon}</div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {tile.title}
                </h3>
              </Link>
            ))}
          </div>

          {/* Today's Classes Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 backdrop-blur-sm bg-opacity-90">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                📅 {formattedDate}'s Classes
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => changeDay(-1)}
                  className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition text-sm font-medium"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => changeDay(1)}
                  className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition text-sm font-medium"
                >
                  Next →
                </button>
              </div>
            </div>

            {classes.length === 0 ? (
              <p className="text-gray-500 italic text-center py-6">
                No classes scheduled for this day.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {classes.map((cls) => (
                  <div
                    key={cls.id}
                    className="border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition bg-gradient-to-br from-white to-gray-50"
                  >
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {cls.subjectName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {cls.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-700 gap-3">
                      <CalendarDaysIcon className="w-5 h-5 text-blue-500" />
                      <span>{cls.startDate}</span>
                      <ClockIcon className="w-5 h-5 text-yellow-500" />
                      <span>{cls.startTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
