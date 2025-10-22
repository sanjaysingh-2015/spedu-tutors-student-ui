// src/pages/MyClasses.jsx
import React, { useEffect, useState } from "react";
import { getMyClasses } from "../services/classService";
import { CalendarDaysIcon, ClockIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function MyClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    fetchMyClasses();
  }, []);

  const fetchMyClasses = async () => {
    setLoading(true);
    try {
      const res = await getMyClasses(studentId);
      setClasses(res.data);
    } catch (err) {
      console.error("Failed to fetch classes:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading your classes...</p>;
  }

  if (!classes.length) {
    return (
      <p className="text-center text-gray-500 mt-10 italic">
        You haven't booked any classes yet.
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        🎓 My Booked Classes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {cls.subjectName}
            </h2>
            <p className="text-sm text-gray-600 mb-3">{cls.description}</p>

            <div className="text-sm text-gray-700 space-y-1">
              <div className="flex items-center gap-2">
                <CalendarDaysIcon className="h-5 w-5 text-blue-500" />
                <span>Start Date: {cls.startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-yellow-500" />
                <span>Time: {cls.startTime} ({cls.sessionDuration} mins)</span>
              </div>
              <div className="flex items-center gap-2">
                <UserGroupIcon className="h-5 w-5 text-green-500" />
                <span>Max Students: {cls.maxStudents}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
