import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getProfile } from "../services/profileService";
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

import { getMySessions,getMySessionsWithDate } from "../services/classService";
import { getWallet } from "../services/paymentService";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [wallet, setWallet] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
      getProfile().then((res) => {
        if (!res.data || res.data.profileStatus === "INITIATE") {
          navigate("/profile");
        } else {
          setProfile(res.data);
          fetchWallet();
          localStorage.setItem("studentId", res.data.code);
          const curDate = new Date();
          fetchClasses(res.data.code, curDate.toISOString().split("T")[0]);
          fetchWallet();
        }
      });
    }, []);

    const fetchWallet = async () =>  {
        const res = await getWallet();
        setWallet(res.data || {});
    }

    const fetchClasses = async (studentId, date) => {
      try {
        const formattedDate = date;
        const res = await getMySessionsWithDate(studentId, formattedDate);
        setClasses(res.data);
      } catch (err) {
        console.error("Failed to fetch classes:", err);
      }
    };

    const changeDay = (offset) => {
      // Convert the current selectedDate string back to a Date object
      const current = new Date(selectedDate);

      // Move forward or backward by offset days
      current.setDate(current.getDate() + offset);

      // Convert back to yyyy-MM-dd format
      const newDateStr = current.toISOString().split("T")[0];

      // Update state and fetch classes
      setSelectedDate(newDateStr);
      const studentId = localStorage.getItem("studentId");
      fetchClasses(studentId, newDateStr);
    };

    const formattedDate = new Date(selectedDate).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

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
            <div className="mt-4 md:mt-0 flex flex-col items-start">
              <Link
                to="/profile"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow hover:shadow-lg hover:from-indigo-600 hover:to-blue-600 transition-all"
              >
                <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
                View Profile
              </Link>
            </div>
          </div>

            {/* 🌤 Today's Sessions Section */}
            <div className="bg-white/90 rounded-3xl shadow-2xl p-6 backdrop-blur-md border border-gray-100 mt-10">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-3xl">📅</span>
                  {formattedDate}'s <span className="text-blue-600">Sessions</span>
                </h2>

                {/* Day Switcher */}
                <div className="flex items-center gap-3 mt-3 md:mt-0">
                  <button
                    onClick={() => changeDay(-1)}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-semibold shadow hover:from-gray-200 hover:to-gray-300 transition-all flex items-center gap-1"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => changeDay(1)}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow hover:from-indigo-600 hover:to-blue-500 transition-all flex items-center gap-1"
                  >
                    Next →
                  </button>
                </div>
              </div>

              {/* Classes List */}
              {classes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                  <div className="text-4xl mb-2">🕓</div>
                  <p className="italic text-lg">No sessions scheduled for this day.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {classes.map((cls) => (
                    <div
                      key={cls.id}
                      className="group relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-5"
                    >
                      {/* Subject & Tutor */}
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        🧑‍🏫 {cls.subjectName} with{" "}
                        <span className="text-indigo-600">{cls.tutorName}</span>
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {cls.description || "Interactive learning session"}
                      </p>

                      {/* Timing Info */}
                      <div className="flex items-center gap-3 text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                          <CalendarDaysIcon className="w-5 h-5 text-blue-500" />
                          <span>{cls.startDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-5 h-5 text-yellow-500" />
                          <span>{cls.startTime}</span>
                        </div>
                      </div>

                      {/* Decorative Corner */}
                      <div className="absolute top-2 right-2 text-xs text-gray-400 font-medium">
                        #{cls.id}
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
